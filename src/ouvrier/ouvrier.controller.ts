import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OuvrierService } from './ouvrier.service';
import CreateOuvrierDto from './dto/create-ouvrier.dto';
import { Ouvrier } from './ouvrier.interface';
import { UpdateOuvrierDto } from './dto/update-ouvrier.dto';

@Controller('ouvrier')
export class OuvrierController {
  constructor(private readonly ouvrierService: OuvrierService) {}

  @Get(':id')
  findOne(@Param('id') _id: string) {
    return this.ouvrierService.findOne(_id);
  }

  @Get()
  findAll() {
    return this.ouvrierService.findAll();
  }

  @Post()
  create(@Body() createOuvierDto: CreateOuvrierDto): Promise<Ouvrier> {
    return this.ouvrierService.create(createOuvierDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateOuvrierDto: UpdateOuvrierDto,
  ): Promise<Ouvrier> {
    return this.ouvrierService.update(id, updateOuvrierDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ouvrierService.delete(id);
  }
}
