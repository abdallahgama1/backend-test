import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        let { page = 1, limit = 10, category, sort = '-createdAt' } = req.query;

        // Ensure page and limit are valid numbers
        page = Math.max(1, parseInt(page, 10) || 1);
        limit = Math.max(1, parseInt(limit, 10) || 10);

        // Filter by category if provided
        const query = category ? { category } : {};

        // Fetch products & total count in parallel for better performance
        const [products, total] = await Promise.all([
            Product.find(query)
                .select('name category price quantity')
                .sort(sort)
                .limit(limit)
                .skip((page - 1) * limit)
                .lean(),
            Product.countDocuments(query)
        ]);

        res.status(200).json({
            products,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error("Error in getProducts controller:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

export const getProductById = async(req,res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) { return res.status(400).json({ error: "Invalid product ID format" }); }

        const product = await Product.findById(id).lean();

        if (!product) { return res.status(404).json({ error: "Product not found" }); }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error from getProductById controller:", error.stack);

        res.status(500).json({
            error: process.env.NODE_ENV === 'production' ? 'Internal server error.' : error.message
        });    
    }   
}

export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        const totalProducts = await Product.countDocuments({ category });
        const totalPages = Math.ceil(totalProducts / limit);

        const products = await Product.find({ category })
            .sort({ price: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        res.status(200).json({
            products,
            pagination: {
                currentPage: page,
                totalPages,
                totalProducts,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        console.error("Error in getProductsByCategory controller:", error);
        res.status(500).json({ 
            error: "Internal server error",
            message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, price, category, quantity } = req.body;

        const product = await Product.create({
            name,
            price,
            category,
            quantity
        });

        const populatedProduct = await Product.findById(product._id).lean();

        res.status(201).json({
            message: "Product created successfully",
            product: populatedProduct
        });

    } catch (error) {
        console.error("Error in createProduct controller:", error);

        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id: productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: "Invalid product ID." });
        }

        const product = await Product.findByIdAndDelete(productId);

        if (!product) {
            return res.status(404).json({ error: "Product not found." });
        }

        res.status(200).json({ message: "Product deleted successfully." });

    } catch (error) {
        console.error("Error in deleteProduct controller:", error.message);
        res.status(500).json({ error: "Internal server error." });      
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const allowedFields = ["name", "price", "category", "quantity"];

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid product ID." });
        }

        const updatedData = {};
        allowedFields.forEach(field => {
            if(req.body[field]) updatedData[field] = req.body[field];
        });

        const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });
        
        if(!product) {
            return res.status(404).json({ error: "Product not found." });
        }
        
        res.status(200).json({
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        console.log("error from update product controller :", error.message);
        res.status(500).json({ error: "Internal server error." });      
    }
}