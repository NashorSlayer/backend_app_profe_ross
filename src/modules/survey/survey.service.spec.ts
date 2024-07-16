import { Test, TestingModule } from '@nestjs/testing';
import { SurveyService } from './survey.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { PrismaModule } from '../../prisma/prisma.module';




describe('SurveyService', () => {
  let service: SurveyService;
  let prismaMockService: any;
  let userMockService: any;


  const prismaMock = {
    surveys: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }
  }

  const userServiceMock = {
    findOne: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SurveyService,
        {
          provide: PrismaService,
          useValue: prismaMock
        },
        {
          provide: UserService,
          useValue: userServiceMock
        },
      ],
      imports: [PrismaModule],
    }).compile();

    service = module.get<SurveyService>(SurveyService);
    prismaMockService = module.get(PrismaService);
    userMockService = module.get(UserService);


    prismaMock.surveys.findUnique.mockClear();
    prismaMock.surveys.findMany.mockClear();
    prismaMock.surveys.create.mockClear();
    prismaMock.surveys.update.mockClear();
    prismaMock.surveys.delete.mockClear();



  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //create
  it('should not create a new survey because user not found', async () => {

    const survey = {
      title: 'Test Survey',
      description: 'Test Description',
      time_range_start: new Date(),
      time_range_end: new Date(),
      answer_time_start: new Date(),
      answer_time_end: new Date(),
      disabled: false,
      user: {
        id: '1',
        username: 'Test User',
        email: 'test@test.com',
        password: '123456',
      }
    }
    const userNotFound = 'User not found';

    prismaMock.surveys.create.mockResolvedValue(userNotFound);
    userServiceMock.findOne.mockResolvedValue(null);
    expect(service.create(survey)).rejects.toThrow(userNotFound);
  })

  //findAll
  it('should return array of surveys', async () => {
    const surveys = [
      {
        id: '1',
        title: 'Test Survey',
        description: 'Test Description',
        time_range_start: new Date(),
        time_range_end: new Date(),
        answer_time_start: new Date(),
        answer_time_end: new Date(),
        disabled: false,
        user: {
          id: '1',
          username: 'Test User',
          email: 'test@test.com',
          password: '123456',
        },
      }, {
        id: '2',
        title: 'Test Survey 2',
        description: 'Test Description 2',
        time_range_start: new Date(),
        time_range_end: new Date(),
        answer_time_start: new Date(),
        answer_time_end: new Date(),
        disabled: false,
        user: {
          id: '2',
          username: 'Test 2 User',
          email: 'test2@test.com',
          password: '123456',
        },
      },]

    prismaMock.surveys.findMany.mockResolvedValue(surveys);
    const result = await service.findAll();
    expect(result).toBeInstanceOf(Array);
    expect(result).toBe(surveys);
  });
});




