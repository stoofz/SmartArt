import prisma from 'utils/prisma';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.body;
console.log("ID", id)
    try {
      // Delete the review using Prisma
      await prisma.feedback.delete({
        where: { id: parseInt(id) },
      });

      return res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Error deleting review:', error);
      return res.status(500).json({ message: 'Failed to delete the review' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}