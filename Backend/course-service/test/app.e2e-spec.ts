import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../prisma/prisma.service';

describe('CourseController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);

    await app.init();
  });

  beforeEach(async () => {
    // Limpiar la base de datos antes de cada prueba
    await prisma.course.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  it('should create a course', () => {
    const createCourseDto = { name: 'Test Course', capacity: 30 };
    return request(app.getHttpServer())
      .post('/courses')
      .send(createCourseDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchObject(createCourseDto);
        expect(res.body.id).toBeDefined();
      });
  });

  it('should get all courses', async () => {
    await prisma.course.create({
      data: { name: 'Test Course', capacity: 30 },
    });

    return request(app.getHttpServer())
      .get('/courses')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toMatchObject({ name: 'Test Course', capacity: 30 });
      });
  });

  it('should get a course by id', async () => {
    const course = await prisma.course.create({
      data: { name: 'Test Course', capacity: 30 },
    });

    return request(app.getHttpServer())
      .get(`/courses/${course.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject({ id: course.id, name: 'Test Course', capacity: 30 });
      });
  });

  it('should return 400 if course not found', () => {
    return request(app.getHttpServer())
      .get('/courses/999')
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe('Course not found');
      });
  });

  it('should update a course', async () => {
    const course = await prisma.course.create({
      data: { name: 'Test Course', capacity: 30 },
    });

    const updateCourseDto = { name: 'Updated Course' };
    return request(app.getHttpServer())
      .put(`/courses/${course.id}`)
      .send(updateCourseDto)
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject({ id: course.id, name: 'Updated Course', capacity: 30 });
      });
  });

  it('should delete a course', async () => {
    const course = await prisma.course.create({
      data: { name: 'Test Course', capacity: 30 },
    });

    return request(app.getHttpServer())
      .delete(`/courses/${course.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject({ id: course.id, name: 'Test Course', capacity: 30 });
      });
  });

  it('should update the capacity of a course', async () => {
    const course = await prisma.course.create({
      data: { name: 'Test Course', capacity: 30 },
    });

    return request(app.getHttpServer())
      .put(`/courses/${course.id}/capacity`)
      .send({ capacity: 50 })
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject({ id: course.id, name: 'Test Course', capacity: 50 });
      });
  });
});
