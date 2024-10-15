import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Layout from '../components/Layout'
import TreeView from '../components/TreeView'
import ItemDetails from '../components/ItemDetails'

export default function Home() {
  const { data: session } = useSession()
  const [selectedItem, setSelectedItem] = useState(null)

  const handleSelect = async (node) => {
    console.log(node, 'node, indexjs')
    if (node.children.length === 0) {
      console.log('Fetching items for godown:', node.id)
      const response = await fetch(`/api/items?godown_id=${node.id}`)
      console.log(response, 'response')
      const items = await response.json()
      if (items.length > 0) {
        setSelectedItem(items[0])  
      } else {
        setSelectedItem(null) 
      }
    }
  }

  if (!session) {
    return (
      <Layout>
        <h1 className="text-2xl font-semibold text-gray-900">Please sign in to view the Godown Tree</h1>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex">
        <div className="w-1/3 pr-4">
          <TreeView onSelect={handleSelect} />
        </div>
        <div className="w-2/3">
          <ItemDetails item={selectedItem} />
        </div>
      </div>
    </Layout>
  )
}
