import { Prisma } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CategoryTableProps {
  category: Prisma.CategoryGetPayload<{
    include: {
      products: {
        select: {
          id: true;
        };
      };
    };
  }>[];
}

const CategoryTable = ({ category }: CategoryTableProps) => {
  return (
    <Table className="px-20">
      <TableHeader>
        <TableRow className="rounded">
          <TableHead>Nome</TableHead>
          <TableHead>Produtos</TableHead>
          <TableHead>Porcentagem de Vendas</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {category.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{category.name}</TableCell>
            <TableCell>{category.products.length}</TableCell>

            <TableCell>1</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
