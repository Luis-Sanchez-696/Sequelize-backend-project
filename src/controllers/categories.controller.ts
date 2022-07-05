import { RequestHandler } from "express";
import { Categories } from "../models/Categories";

//Controllers de la tabla Categories;

export const getCategories: RequestHandler = async (_request, response) => {
  try {
    const categories = await Categories.findAll();
    response.json(categories);
    response.status(200);
  } catch (error) {
    response.status(400).json({ message: error.message });
    response.send("Error");
  }
};

export const getCategory: RequestHandler = async (request, response) => {
  try {
    const { id } = request.params;

    const category = await Categories.findOne({
      where: {
        id,
      },
    });
    response.send(category);
    response.status(200);
  } catch (error) {
    response.status(400).json({ message: error.message });
    response.send("Error");
  }
};

export const createCategory: RequestHandler = async (request, response) => {
  try {
    const { name } = request.body;

    await Categories.create({
      name,
    });
    response.send("New Category Created");
    response.status(200);
  } catch (error) {
    response.status(400).json({ message: error.message });
    response.send("Error");
  }
};

export const updateCategory: RequestHandler = async (request, response) => {
  try {
    const { id } = request.params;
    const { name } = request.body;

    await Categories.update(
      {
        name,
      },
      {
        where: {
          id,
        },
      }
    );

    response.send("Category updated");
    response.status(200);
  } catch (error) {
    response.status(400).json({ message: error.message });
    response.send("Error");
  }
};

export const deleteCategory: RequestHandler = async (request, response) => {
  try {
    const { id } = request.params;

    await Categories.destroy({
      where: {
        id,
      },
    });
    response.send("Category deleted");
    response.status(200);
  } catch (error) {
    response.status(400).json({ message: error.message });
    response.send("Error");
  }
};
