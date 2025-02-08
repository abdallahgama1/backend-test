import express from "express"; 
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";    
import { 
    getProducts,
    createProduct,
    getProductsByCategory,
    deleteProduct,
    getProductById,
    updateProduct 
    } from "../controllers/product.controller.js";
import { updateProductValidators } from "../validators/product.validator.js";
import { validateRequest } from "../middleware/validator.middleware.js";
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/category/:category", getProductsByCategory);

router.post(
    "/",
    protectRoute,
    adminRoute,
    updateProductValidators, 
    validateRequest, 
    createProduct
);  

router.put(
    "/:id",
    protectRoute, 
    adminRoute, 
    updateProductValidators, 
    validateRequest, 
    updateProduct
);  

router.delete("/:id", protectRoute, adminRoute, deleteProduct); 

export default router;  