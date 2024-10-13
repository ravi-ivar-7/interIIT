import clientPromise from '../../lib/db'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db('godown')

  switch (req.method) {
    case 'GET':
      const godowns = await db.collection('locations').find({}).toArray()
      res.status(200).json(godowns)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}