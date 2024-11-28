// pages/api/favorites.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const favoriteBooks = await prisma.favorite.findMany({
      where: { userId },
      include: { book: true },
    });

    res.status(200).json(favoriteBooks.map(fav => fav.book));
  } catch (error) {
    console.error('Error fetching favorite books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
