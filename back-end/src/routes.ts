import { Router} from "express";
import multer from "multer";

//User
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserControler";
import { DetailUserController } from "./controllers/user/DetailUserController";

//Category
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

//Product
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

//Order
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoverOrderController } from "./controllers/order/RemoveOrderController";

//Order -> Item
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";

import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";


//Middlewares
import { isAuthenticated } from "./middlewares/isAuthenticated";

//Configs
import uploadConfig from "./config/multer";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))

// Rotas User
router.post("/users", new CreateUserController().handle)

router.post("/session", new AuthUserController().handle)

router.get("/me", isAuthenticated, new DetailUserController().handle)

//Rotas Category

router.post("/category", isAuthenticated, new CreateCategoryController().handle)

router.get("/category", isAuthenticated, new ListCategoryController().handle)

//Rotas Product

router.post("/product", isAuthenticated, upload.single("file"), new CreateProductController().handle)

router.get("/category/product", isAuthenticated, new ListByCategoryController().handle)

//Rotas Order

router.post("/order", isAuthenticated, new CreateOrderController().handle)
router.delete("/order", isAuthenticated, new RemoverOrderController().handle)

router.post("/order/add", isAuthenticated, new AddItemController().handle)
router.delete("/order/remove", isAuthenticated, new RemoveItemController().handle)

router.put("/order/send", isAuthenticated, new SendOrderController().handle)

router.get("/orders", isAuthenticated, new ListOrdersController().handle)
router.get("/order/detail", isAuthenticated, new DetailOrderController().handle)
router.put("/order/finish", isAuthenticated, new FinishOrderController().handle)

export { router };
