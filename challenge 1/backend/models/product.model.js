import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: [2, "Name must be at least 2 characters"],
        maxLength: [100, "Name cannot exceed 100 characters"]
    },
    category: {
        type: String,
        trim: true
        // enum: ["Electronics", "Clothing", "Books", "Furniture"], 
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"]
    }, 
    quantity: {
        type: Number,
        default: 0,
        min: [0, "Quantity cannot be negative"],
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be an integer"
        }
    }
}, { timestamps: true } );

productSchema.pre("save", function(next) {
    this.name = this.name.split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;