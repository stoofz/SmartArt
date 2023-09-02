import prisma from 'utils/prisma';
import { IncomingForm } from 'formidable';
import path from 'path';

// Disable default body parser to use middleware
export const config = {
  api: {
    bodyParser: false, 
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm({ keepExtensions: true });

    form.uploadDir = path.join(process.cwd(), 'public/uploads');

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Error uploading image' });
      }

      const { price, name, stock, description, category_id } = fields;
      const { image } = files;

      try {

        const addProduct = await prisma.product.create({
          data: {
            name: name[0],
            stock: parseInt(stock),
            image: image[0].newFilename,
            description: description[0],
            categoryId: parseInt(category_id),
            price: parseFloat(price),
          },
        });

        res.status(201).json(addProduct);
        await prisma.$disconnect();

      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error' });
      }
    });
  } else {
    // Not a POST request
    res.status(405).end();
  }
}
