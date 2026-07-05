import { Test } from '@nestjs/testing';
import { DataController } from './data.controller';
import { DataService } from './data.service';

describe('DataController', () => {
  let controller: DataController;
  const dataService = {
    encryptData: jest.fn(() => ({ data1: 'd1', data2: 'd2' })),
    decryptData: jest.fn(() => ({ payload: 'plain' })),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      controllers: [DataController],
      providers: [{ provide: DataService, useValue: dataService }],
    }).compile();

    controller = module.get(DataController);
  });

  it('is defined', () => {
    expect(controller).toBeDefined();
  });

  it('create() delegates payload to DataService.encryptData', () => {
    const result = controller.encrypted({ payload: 'hi' });
    expect(dataService.encryptData).toHaveBeenCalledWith('hi');
    expect(result).toEqual({ data1: 'd1', data2: 'd2' });
  });

  it('findOne() delegates data1/data2 to DataService.decryptData', () => {
    const result = controller.decrypted({ data1: 'a', data2: 'b' });
    expect(dataService.decryptData).toHaveBeenCalledWith('a', 'b');
    expect(result).toEqual({ payload: 'plain' });
  });
});
