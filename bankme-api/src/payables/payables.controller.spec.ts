import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { PayablesController } from './payables.controller';
import { ValidatePayableDto } from './dto/validate-payable.dto';

describe('PayablesController', () => {
  let controller: PayablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayablesController],
    }).compile();

    controller = module.get<PayablesController>(PayablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('validate', () => {
    const validPayableDto: ValidatePayableDto = {
      id: 'd6a3b46b-343e-48a6-b8ed-32bcb25b8f94',
      value: 1500.5,
      emissionDate: new Date('2024-11-01'),
      assignor: {
        id: 'b7f33a2b-5c9c-4e1d-8c7f-81b8bb8d9c7a',
        document: '12345678901234',
        email: 'assignor@example.com',
        phone: '1234567890',
        name: 'Assignor Example',
      },
    };

    it('should return the validated data when input is valid', async () => {
      const result = await controller.validate(validPayableDto);
      expect(result).toEqual({
        message: 'Dados validados com sucesso.',
        data: validPayableDto,
      });
    });

    it('should throw BadRequestException if id is not a UUID', async () => {
      const invalidDto = { ...validPayableDto, id: 'invalid-uuid' };
      await expect(controller.validate(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if value is not a number', async () => {
      const invalidDto = { ...validPayableDto, value: 'not-a-number' as any };
      await expect(controller.validate(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if emissionDate is invalid', async () => {
      const invalidDto = { ...validPayableDto, emissionDate: 'invalid-date' };
      await expect(controller.validate(invalidDto as unknown as ValidatePayableDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if assignor.id is not a UUID', async () => {
      const invalidDto = {
        ...validPayableDto,
        assignor: { ...validPayableDto.assignor, id: 'invalid-uuid' },
      };
      await expect(controller.validate(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if assignor.document is too short', async () => {
      const invalidDto = {
        ...validPayableDto,
        assignor: { ...validPayableDto.assignor, document: '123' },
      };
      await expect(controller.validate(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if assignor.email is invalid', async () => {
      const invalidDto = {
        ...validPayableDto,
        assignor: { ...validPayableDto.assignor, email: 'invalid-email' },
      };
      await expect(controller.validate(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if assignor.phone is too short', async () => {
      const invalidDto = {
        ...validPayableDto,
        assignor: { ...validPayableDto.assignor, phone: '123' },
      };
      await expect(controller.validate(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if assignor.name is empty', async () => {
      const invalidDto = {
        ...validPayableDto,
        assignor: { ...validPayableDto.assignor, name: '' },
      };
      await expect(controller.validate(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return a detailed error message', async () => {
      const invalidDto = {
        ...validPayableDto,
        id: 'invalid-uuid',
        value: 'not-a-number' as any,
        emissionDate: 'invalid-date',
        assignor: {
          id: 'invalid-uuid',
          document: '123',
          email: 'invalid-email',
          phone: '123',
          name: '',
        },
      };

      await expect(controller.validate(invalidDto as unknown as ValidatePayableDto)).rejects.toThrow(
        BadRequestException,
      );

      try {
        await controller.validate(invalidDto as unknown as ValidatePayableDto);
      } catch (error) {
        const { response } = error;
        expect(response.errors.length).toBe(8);
        expect(response.errors).toEqual(
          expect.arrayContaining([
            { field: 'id', messages: ['id must be a UUID'] },
            { field: 'value', messages: ['value must be a number'] },
            {
              field: 'emissionDate',
              messages: ['emissionDate must be a valid ISO 8601 date string'],
            },
            { field: 'assignor.id', messages: ['id must be a UUID'] },
            {
              field: 'assignor.document',
              messages: [
                'document must be longer than or equal to 11 characters',
              ],
            },
            { field: 'assignor.email', messages: ['email must be an email'] },
            {
              field: 'assignor.phone',
              messages: [
                'phone must be longer than or equal to 10 characters',
              ],
            },
            { field: 'assignor.name', messages: ['name should not be empty'] },
          ]),
        );
      }
    });
  });
});
