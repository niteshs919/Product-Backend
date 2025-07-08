import { Router } from 'express';
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/itemController';

const router = Router();

router.get('/', getItems); // GET    /api/items         - Get all items
router.get('/:id', getItemById); // GET    /api/items/:id     - Get single item
router.post('/', createItem); // POST   /api/items         - Create new item
router.put('/:id', updateItem); // PUT    /api/items/:id     - Update item
router.delete('/:id', deleteItem); // DELETE /api/items/:id     - Delete item

export default router;
