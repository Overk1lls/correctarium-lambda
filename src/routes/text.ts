import { Router, Request, Response } from 'express';
import { processText } from '../utils/utils';

const router = Router();

router.post('/', (req: Request, res: Response) => {
    if (!req.body.text || req.body.text.length === 0 || !req.body.fileType) return res.status(400);

    const text: string = req.body.text;
    const fileType: string = req.body.fileType;

    const result = processText(text, fileType);

    return res.status(200).json({ result });
});

export default router;