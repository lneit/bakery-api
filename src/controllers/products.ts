import { RequestHandler } from 'express';
import { Product } from '../models/products';
import { PRODUCTS } from './data';

export const getProducts: RequestHandler = (req, resp, next) => {
    resp.status(200).json(PRODUCTS.getAll());
};

export const getProduct: RequestHandler<{code: string}> = (req, resp, next) => {
    const code = req.params.code;
    const product = PRODUCTS.get(code);

    if (!!!product) {
        resp.status(422).json({message: "Could not find a product", code});
        return;
    }
    resp.status(200).json(product);
};

export const createProduct: RequestHandler = (req, resp, next) => {
    const {code, name, packaging_options} = req.body as {
        code: string,
        name: string,
        packaging_options: {
            count: number,
            price: number
        }[]
    };

    if (PRODUCTS.get(code)) {
        resp.status(422).json({message: "Product already exists", code});
        return;
    }

    PRODUCTS.add(new Product(code, name, packaging_options));

    resp.status(201).json({message: "Created the product", code});
};