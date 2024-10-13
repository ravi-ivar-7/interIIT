import { useState } from 'react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid'

function TreeNode({ node, onSelect }) {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = node.children && node.children.length > 0

  return (
    <div className="mb-2">
      <div 
        className={`flex items-center cursor-pointer p-4 rounded-lg transition duration-200 
          ${isOpen ? 'bg-blue-100' : 'bg-white'} hover:bg-blue-200 shadow-md`}
        onClick={() => {
          if (hasChildren) {
            setIsOpen(!isOpen)
          } else {
            onSelect(node)
          }
        }}
      >
        {hasChildren && (
          isOpen ? <ChevronDownIcon className="h-5 w-5 text-blue-600" /> : <ChevronRightIcon className="h-5 w-5 text-blue-600" />
        )}
        <span className="ml-3 text-lg font-medium text-gray-800">{node.name}</span>
      </div>
      {isOpen && hasChildren && (
        <div className="ml-6">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TreeNode;
