import { RequestHandler } from "express";
import { Products } from "../models/Products";
import { Categories } from "../models/Categories";
import { Products_Categories } from "../models/Products_Categories";

//Types

type EditProductCategoriesProps = {
  categoriesAdded: Array<{ id: number }>;

  categoriesDeleted: Array<{ id: number }>;

  productDetails: {
    name: string;
    amount: number;
    description: string;
  };
};

type CreateNewProductWithCategories = {
  name: string;
  amount: number;
  description: string;
  categories: Array<{ id: number }>;
  newCategories: Array<{ name: string }>;
};

//Controllers de la tabla Products;

export const getProducts: RequestHandler = async (_request, response) => {
  try {
    const products = await Products.findAll();
    response.json(products);
    response.status(200);
  } catch (error) {
    response.status(400).json({ message: error.message });
    response.send("Error");
  }
};

export const getProduct: RequestHandler = async (request, response) => {
  const { id } = request.params;

  try {
    const product = await Products.findOne({
      where: {
        id,
      },
    });
    response.json(product);
    response.status(200);
  } catch (error) {
    response.status(400).json({ message: error.message });
    response.send("Error");
  }
};

export const createProduct: RequestHandler = async (request, response) => {
  const { name, amount, description } = request.body;

  try {
    await Products.create({
      name,
      amount,
      description,
    });
    response.send("New Product Created");
    response.status(200);
  } catch (error) {
    response.status(400).json({ message: error.message });
    response.send("Error");
  }
};

export const updateProduct: RequestHandler = async (request, response) => {
  const { id } = request.params;
  const { name, amount, description } = request.body;

  try {
    await Products.update(
      {
        name,
        amount,
        description,
      },
      {
        where: {
          id,
        },
      }
    );
    response.send("Product updated");
    response.status(200);
  } catch (error) {
    response.status(400).json({ message: error.message });
    response.send("Error");
  }
};

export const deleteProduct: RequestHandler = async (request, response) => {
  const { id } = request.params;
  try {
    await Products.destroy({
      where: {
        id,
      },
    });
    response.send("Product deleted");
    response.status(200);
  } catch (error) {
    response.status(400).json({ message: error.message });
    response.send("Error");
  }
};

//-------------------------------------------------

//Peticiones sobre relacion N:M;

export const getProductCategories: RequestHandler = async (
  _request,
  response
) => {
  try {
    const productsCategoriesLength = (await Products_Categories.findAll())
      .length;

    if (productsCategoriesLength > 0) {
      const productCategories = await Products.findAll({
        include: [
          {
            model: Categories,
            attributes: { exclude: ["id"] },
            through: { attributes: [] },
          },
        ],
      });

      response.send(productCategories);
      response.status(200);
    } else {
      response.send("Not Found");
    }
  } catch (error) {
    response.status(400).json({ message: error.message });
    response.send("Error");
  }
};

export const editProductCategories: RequestHandler = async (
  request,
  response
) => {
  try {
    const { categoriesAdded, categoriesDeleted, productDetails } =
      request.body as EditProductCategoriesProps;
    const { id } = request.params;

    if (categoriesAdded?.length > 0) {
      categoriesAdded?.forEach(async (category) => {
        await Products_Categories.create({
          productId: id,
          categoryId: category.id,
        });
      });
    }

    if (categoriesDeleted?.length > 0) {
      categoriesDeleted?.forEach(async (category) => {
        await Products_Categories.destroy({
          where: {
            productId: id,
            categoryId: category.id,
          },
        });
      });
    }

    if (productDetails) {
      await Products.update(
        {
          name: productDetails.name,
          amount: productDetails.amount,
          description: productDetails.description,
        },
        {
          where: {
            id: id,
          },
        }
      );
    }
    response.send("Product updated succesfully");
    response.status(200);
  } catch (error) {
    response.status(400).json({ message: error.message });
    response.send("Error");
  }
};

export const createNewProductWithCategories: RequestHandler = async (
  request,
  response
) => {
  try {
    const { name, amount, description, categories, newCategories } =
      request.body as CreateNewProductWithCategories;

    const newProduct = await Products.create({
      name,
      amount,
      description,
    });

    const newProductId = newProduct.getDataValue("id");

    if (categories?.length > 0) {
      categories?.forEach(async (category) => {
        await Products_Categories.create({
          productId: newProductId,
          categoryId: category.id,
        });
      });
    }

    if (newCategories?.length > 0) {
      newCategories?.forEach(async (category) => {
        if (
          (await Categories.findOne({ where: { name: category.name } })) ===
          null
        ) {
          const newCategory = await Categories.create({
            name: category.name,
          });

          const newCategoryId = await newCategory.getDataValue("id");
          await Products_Categories.create({
            productId: newProductId,
            categoryId: newCategoryId,
          });
        }
      });
    }
    response.send("New product created succesfully");
    response.status(200);
  } catch (error) {
    response.status(400).json({ message: error.message });
    response.send("Error");
  }
};
