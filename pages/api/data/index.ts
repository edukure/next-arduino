import {NextApiRequest, NextApiResponse} from "next";

interface Data {
    timestamp: Number,
    value: Number
}

let data: Data[] = [];
data.push({
    timestamp: 1,
    value: 27.5
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const httpMethod = req.method;

    switch(httpMethod) {
        case 'GET':
            res.status(200).json(data);
            break;
        case 'POST':
            handlePost(req, res);
            break;
        default:
            res.status(405).json({message: "not supported"});
    }
}

const handlePost = (req: NextApiRequest, res: NextApiResponse) => {
    const {timestamp, value} = req.body;
    console.log(req.body);
    data.push({timestamp, value});
    return res.status(200).json({message: "post", timestamp, value});
}