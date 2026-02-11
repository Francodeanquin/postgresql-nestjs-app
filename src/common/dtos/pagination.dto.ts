import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min, min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    default: 10,
    description: 'How may rows do you nedd',
  })
  @IsOptional()
  @IsPositive()
  //transformar
  @Type(() => Number) //enable implicitConversions: true in main.ts
  limit?: number;

  @ApiProperty({
    default: 10,
    description: 'How may rows do you want to skip',
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}
