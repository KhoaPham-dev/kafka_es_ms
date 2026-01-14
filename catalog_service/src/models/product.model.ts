export class Product {
  name: string;
  description: string;
  stock: number;
  price: number;
  id?: number;

  constructor(
    name: string,
    description: string,
    stock: number,
    price: number,
    id: number
  ) {
    this.name = name;
    this.description = description;
    this.stock = stock;
    this.price = price;
    this.id = id;
  }
}