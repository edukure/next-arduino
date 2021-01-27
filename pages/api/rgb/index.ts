import { NextApiRequest, NextApiResponse } from 'next';

let color = '#20b2aa';
let rgbColors = {};

function hexToRgb(input: string) {
    // turn hex val to RGB
    const checkHex = /^\#((?=[a-z0-9]+)(?:.{6}|.{3}))$/i.exec(input);

    if (!checkHex) throw new Error('this is not a hex valid');

    // remove first element because it's all regex select
    checkHex.shift();

    const [hex] = checkHex;

    const size = hex.length / 3;

    // 1 ^ 3 = 2 || 2 ^ 3 = 1
    // tslint:disable-next-line: no-bitwise
    const hexColor = (pos: number) =>
        parseInt(hex.slice(size * pos, size * pos + size).repeat(size ^ 3), 16);

    const r = hexColor(0);
    const g = hexColor(1);
    const b = hexColor(2);

    return { r, g, b };
}

const postHandler = (req: NextApiRequest, res: NextApiResponse) => {
    const { newColor } = req.body;
    const oldColor = color;
    color = newColor;
    return res.json({ old: oldColor, new: color });
};

const getHandler = (req: NextApiRequest, res: NextApiResponse) => {
    const header = req.headers;
    if (header['user-agent'] == 'esp8266') {
        rgbColors = hexToRgb(color);
        return res.json({
            red: rgbColors['r'],
            green: rgbColors['g'],
            blue: rgbColors['b'],
        });
    }
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
