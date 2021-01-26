import { NextApiRequest, NextApiResponse } from 'next';

let color = '#20b2aa';

const postHandler = (req: NextApiRequest, res: NextApiResponse) => {
    const { newColor } = req.body;
    const oldColor = color;
    color = newColor;
    return res.json({old: oldColor, new: color});
};

const getHandler = (req: NextApiRequest, res: NextApiResponse) => {
    return res.json({ color });
};

const handlers = {
    POST: postHandler,
    GET: getHandler,
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const httpMethod = req.method;

    handlers[httpMethod](req, res);
};
