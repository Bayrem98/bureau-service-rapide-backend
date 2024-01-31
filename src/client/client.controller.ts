import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.interface';
import CreateClientDto from './dto/create-client.dto';
import UpdateClientDto from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get(':id')
  findOne(@Param('id') _id: string) {
    return this.clientService.findOne(_id);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Post()
  create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientService.create(createClientDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.clientService.delete(id);
  }
}
