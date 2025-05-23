import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty({
    description: 'The name of the cat',
    example: 'Whiskers',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'The age of the cat in years',
    example: 3,
    minimum: 0,
  })
  age: number;

  @ApiProperty({
    description: 'The breed of the cat',
    example: 'Persian',
  })
  breed: string;
}