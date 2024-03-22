import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { OuvrierService } from './ouvrier.service';
import CreateOuvrierDto from './dto/create-ouvrier.dto';
import { Ouvrier } from './ouvrier.interface';
import { UpdateOuvrierDto } from './dto/update-ouvrier.dto';

@Controller('ouvrier')
export class OuvrierController {
  constructor(private readonly ouvrierService: OuvrierService) {}
  @Get()
  findAll(@Query('profession') profession: string) {
    if (!profession) return this.ouvrierService.findAll();
    return this.ouvrierService.search(profession);
  }

  @Get(':id')
  findOne(@Param('id') _id: string) {
    return this.ouvrierService.findOne(_id);
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

  @Put('updateavis/:id')
  async updateAvis(
    @Param('id') id: string,
    @Body() updateOuvrier: UpdateOuvrierDto,
  ): Promise<Ouvrier> {
    return this.ouvrierService.update(id, updateOuvrier);
  }
}
