import { Test, TestingModule } from '@nestjs/testing';
import { AreaService } from './area.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';

describe('AreaService', () => {
  let service: AreaService;
  let prismaMockService: any;

  const prismaMock = {
    areas: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AreaService, PrismaService],
      imports: [PrismaModule],
    }).overrideProvider(PrismaService).useValue(prismaMock).compile();

    service = module.get<AreaService>(AreaService);
    prismaMockService = module.get(PrismaService);

    prismaMock.areas.findUnique.mockClear();
    prismaMock.areas.findMany.mockClear();
  });

  //findAll
  it("should return empty array if there are no areas", async () => {
    prismaMockService.areas.findMany.mockResolvedValue([]);
    const result = await service.findAll();
    expect(result).toBeInstanceOf(Array);
    expect(prismaMockService.areas.findMany).toHaveBeenCalledTimes(1);
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //findOne
  it("should return an area by id", async () => {
    prismaMockService.areas.findUnique.mockResolvedValue({ id: "1", name: "Test Area" });
    const found = await service.findOne("1");
    expect(found).toHaveProperty('id');
  })

  //create
  it("should create a new area", async () => {
    const area = await service.create({ name: "Test Area" });
    expect(area).toHaveProperty('id');
  });

});
