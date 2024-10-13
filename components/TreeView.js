import { useState, useEffect } from 'react'
import TreeNode from './TreeNode'

export default function TreeView({ onSelect }) {
  const [treeData, setTreeData] = useState([])

  useEffect(() => {
    fetch('/api/godowns')
      .then(response => response.json())
      .then(data => {
        const buildTree = (items, parentId = null) => {
          return items
            .filter(item => item.parent_godown === parentId)
            .map(item => ({ ...item, children: buildTree(items, item.id) }))
        }
        setTreeData(buildTree(data))
      })
  }, [])

  return (
    <div className="bg-gray-50 shadow-lg overflow-hidden sm:rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">Warehouse Inventory</h2>
      <div className="space-y-2">
        {treeData.map((node) => (
          <TreeNode key={node.id} node={node} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}
