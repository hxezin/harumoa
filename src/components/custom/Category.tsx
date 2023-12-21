interface CategoryProps {
  category: string

  setCategory: (data: string) => void

  isEdit: boolean
}

const Category = ({ category, setCategory, isEdit }: CategoryProps) => {
  return <div>{category}</div>
}

export default Category
