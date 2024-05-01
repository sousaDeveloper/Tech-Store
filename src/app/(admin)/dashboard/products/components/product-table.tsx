import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductWithTotalPrice } from "@/helpers/product";

interface ProductTableProps {
  products: ProductWithTotalPrice[];
}

const ProductTable = ({ products }: ProductTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="rounded">
          <TableHead>Nome</TableHead>
          <TableHead>Categorias</TableHead>
          <TableHead>Preço Cheio</TableHead>
          <TableHead>Preço com Desconto</TableHead>
          <TableHead>Vendidos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.categoryId}</TableCell>
            {product.discountPercentage === 0 ? (
              <TableCell>R$ {+product.basePrice},00</TableCell>
            ) : (
              <TableCell>
                R$ {+product.basePrice - +product.totalPrice},00
              </TableCell>
            )}
            <TableCell>R$ {+product.basePrice},00</TableCell>

            <TableCell className="text-right">1</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
