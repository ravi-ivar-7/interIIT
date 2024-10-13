import clientPromise from '../../lib/db'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db('godown')

  switch (req.method) {
    case 'GET':
      const { godown_id } = req.query
      const query = godown_id ? { godown_id } : {}
      const items = await db.collection('items').find(query).toArray()
      res.status(200).json(items)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}