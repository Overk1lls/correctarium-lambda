import { Router } from 'express';
import { processText } from '../../lib/utils';

const router = Router();

router.post('/', (req, res) => {
    if (!req.body.text || !req.body.fileType)
        return res.status(400);

    const { text, fileType }: { text: string, fileType: string } = req.body;

    const result = processText(text, fileType);

    return res.status(200).json({ result });
});

export default router;
