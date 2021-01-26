import { NextApiRequest, NextApiResponse } from 'next';

interface Data {
    timestamp: Date;
    value: Number;
}

let data: Data[] = [];
data.push({
    timestamp: new Date(),
    value: 27.5,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const httpMethod = req.method;

    switch (httpMethod) {
        case 'GET':
            res.status(200).json(data);
            break;
        case 'POST':
            handlePost(req, res);
            break;
        default:
            res.status(405).json({ message: 'not supported' });
    }
};

const handlePost = (req: NextApiRequest, res: NextApiResponse) => {
    const { payload } = req.body;
    console.log(req.body);

    if (payload.length > 0) {
        for (let item of payload) {
            data.push({ timestamp: new Date(), value: item });
        }
    }
    return res.status(200).json({ message: 'post', payload });
};
