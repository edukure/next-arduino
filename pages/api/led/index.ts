import { NextApiRequest, NextApiResponse } from 'next';

let ledState = 1;

const toggle = () => {
    if (ledState) {
        ledState = 0;
    } else {
        ledState = 1;
    }
};

const postHandler = (req: NextApiRequest, res: NextApiResponse) => {
    toggle();
    return res.json({ state: ledState });
};

const getHandler = (req: NextApiRequest, res: NextApiResponse) => {
    return res.json({ state: ledState });
};

const handlers = {
    POST: postHandler,
    GET: getHandler,
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const httpMethod = req.method;

    handlers[httpMethod](req, res);
};
