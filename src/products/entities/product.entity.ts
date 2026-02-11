import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from 'src/auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'products', //nombre de la tabla en la base de datos, ahi se mostrara en plural
})
export class Product {
  @ApiProperty({
    example: '98fcde4e-2465-4c92-afcb-f1c2b0f832c5',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @ApiProperty({
    example: 'T-shirt Teslo',
    description: 'Product title',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  title: string;

  @ApiProperty({
    example: 0,
    description: 'Product Price',
  })
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty({
    example: 'lorem ipsun aprend redit common 4chab',
    description: 'Product Description',
    default: null,
  })
  @Column({
    type: 'text',
    nullable: true, //acepta null values
  })
  description: string;

  @ApiProperty({
    example: 't_shirt_Teslo',
    description: 'product Slug- for SEO',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  slug: string;

  @ApiProperty({
    example: '10',
    description: 'Product stock',
    default: 0,
  })
  @Column({ type: 'int', default: 0 })
  stock: number;

  @ApiProperty({
    example: ['M', 'XL', 'XXL'],
    description: 'Product sizes',
  })
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty({
    example: 'women',
    description: 'Product gender',
  })
  @Column('text')
  gender: string;

  //tags
  @ApiProperty({
    example: ['shirt'],
    description: 'Product tags',
  })
  @Column('text', { array: true, default: [] })
  tags: string[];

  //images
  @ApiProperty({
    example: ['8764600-00-A_0_2000.jpg', '8764600-00-A_2.jpg'],
    description: 'Product images',
  })
  @OneToMany(
    () => ProductImage,
    (productImage) => productImage.product,
    { cascade: true, eager: true }, //cascade: guarda las imagenes junto con el producto, eager: siempre carga las imagenes al traer el producto
  )
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
