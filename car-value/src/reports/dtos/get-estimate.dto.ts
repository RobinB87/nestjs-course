import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { million } from './create-report.dto';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsLatitude()
  lat: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(0)
  @Max(million)
  mileage: number;
}
