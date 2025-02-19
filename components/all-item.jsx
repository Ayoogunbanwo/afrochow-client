"use client"

import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from "lucide-react"

// Memoized table row component for better performance
const ItemRow = memo(({ item, onDelete }) => (
  <TableRow className="group">
    {/* Mobile-first approach with responsive classes */}
    <TableCell className="font-medium">{item.name}</TableCell>
    <TableCell className="hidden sm:table-cell max-w-xs">
      <p className="truncate" title={item.description}>
        {item.description}
      </p>
    </TableCell>
    <TableCell>${item.price}</TableCell>
    <TableCell className="hidden md:table-cell">
      {item.deliveryTime} minutes
    </TableCell>
    <TableCell className="hidden lg:table-cell">
      <span className={`px-2 py-1 rounded-full text-sm ${
        item.isPopular 
          ? "bg-green-100 text-green-700" 
          : "bg-gray-100 text-gray-700"
      }`}>
        {item.isPopular ? "Popular" : "Standard"}
      </span>
    </TableCell>
    <TableCell>
      <Button
        variant="destructive"
        onClick={() => onDelete(item.id)}
        className="bg-red-500 hover:bg-red-600 text-white p-2 h-8 w-8"
        title="Delete item"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </TableCell>
  </TableRow>
))

// Mobile card view for very small screens
const MobileItemCard = memo(({ item, onDelete }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border mb-4 sm:hidden">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-medium">{item.name}</h3>
      <Button
        variant="destructive"
        onClick={() => onDelete(item.id)}
        className="bg-red-500 hover:bg-red-600 text-white p-2 h-8 w-8"
        title="Delete item"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
    <div className="flex justify-between items-center text-sm">
      <span className="font-medium">${item.price}</span>
      <span className="text-gray-600">{item.deliveryTime} minutes</span>
    </div>
    {item.isPopular && (
      <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-sm rounded-full">
        Popular
      </span>
    )}
  </div>
))

const AllItems = ({ data = [], onDeleteItem }) => {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold text-orange-700">
            All Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            No items available
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-bold text-orange-700">
          All Items ({data.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Mobile cards view */}
        <div className="sm:hidden">
          {data.map((item) => (
            <MobileItemCard
              key={item.id}
              item={item}
              onDelete={onDeleteItem}
            />
          ))}
        </div>

        {/* Table view for larger screens */}
        <div className="hidden sm:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden md:table-cell">Delivery Time</TableHead>
                <TableHead className="hidden lg:table-cell">Status</TableHead>
                <TableHead className="w-16">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  onDelete={onDeleteItem}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default memo(AllItems)