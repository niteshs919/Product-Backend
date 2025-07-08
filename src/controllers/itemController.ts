import { Request, Response, NextFunction } from 'express';
import { ItemModel } from '../models/item';

// Create item
export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.body;
    const newItem = await ItemModel.create({ name });
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

// Get all items
export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allItems = await ItemModel.find();
    res.json(allItems);
  } catch (error) {
    next(error);
  }
};

export const getItemById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const item = await ItemModel.findById(req.params.id);
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};
// Update item
export const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const item = await ItemModel.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true },
    );
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};

// Delete item
export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const item = await ItemModel.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};
