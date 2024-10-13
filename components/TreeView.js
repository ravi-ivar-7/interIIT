import { useState, useEffect } from 'react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid'

function TreeNode({ node, onSelect }) {
  const [isOpen, setIsOpen] = useState(false)

  const hasChildren = node.children && node.children.length > 0

  return (
    <div>
      <div 
        className="flex items-center cursor-pointer hover:bg-gray-100 p-2"
        onClick={() => {
          if (hasChildren) {
            setIsOpen(!isOpen)
          } else {
            onSelect(node)
          }
        }}
      >
        {hasChildren && (
          isOpen ? <ChevronDownIcon className="h-5 w-5 text-gray-400" /> : <ChevronRightIcon className="h-5 w-5 text-gray-400" />
        )}
        <span className="ml-2">{node.name}</span>
      </div>
      {isOpen && hasChildren && (
        <div className="ml-4">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  )
}

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
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
      {treeData.map((node) => (
        <TreeNode key={node.id} node={node} onSelect={onSelect} />
      ))}
    </div>
  )
}