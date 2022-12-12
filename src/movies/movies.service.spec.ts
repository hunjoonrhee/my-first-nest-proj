import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', ()=>{
    
    it("should return an array", ()=>{
      const result = service.getAll();      
      expect(result).toBeInstanceOf(Array);
    })
  });

  describe('getOne', ()=>{
    it("should return a movie", ()=>{
      service.create({
        title:"Test Movie",
        genres:["test"],
        year:2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it("should throw 404 error", ()=>{
      try{
        service.getOne(999)
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with Id 999 was not found")
      }
    })
  });

  describe("remove", ()=>{

    it("deletes a movie", ()=>{
      service.create({
        title:"Test Movie",
        genres:["test"],
        year:2000,
      });
      service.create({
        title:"Test Movie2",
        genres:["test"],
        year:2002,
      });
      service.remove(1);
      const allMovies = service.getAll();
      expect(allMovies.length).toEqual(1);
      expect(allMovies.at(0).id).toEqual(2);
    });

    it("should throw 404 error", ()=>{
      try{
        service.remove(3)
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with Id 3 was not found")
      }
    })

  });

  describe("create", ()=>{
    
    it("should create a movie", ()=>{
      const moviesBeforeCreate = service.getAll().length;
      service.create({
        title:"Test Movie",
        genres:["test"],
        year:2000,
      });
      const moviesAfterCreate = service.getAll().length;
      console.log(moviesBeforeCreate)

      expect(moviesAfterCreate).toBeGreaterThan(moviesBeforeCreate);
      expect(moviesAfterCreate).toEqual(1);
    })

  });

  describe("update", ()=>{

    it("should update a movie", ()=>{
      service.create({
        title:"Test Movie",
        genres:["test"],
        year:2000,
      });

      service.update(1, {title:"updated test"});
      const movie = service.getOne(1);

      expect(movie.title).toEqual("updated test")
    })

    it("should throw a NotFoundException", ()=>{
      try{
        service.update(3, {title:"updated test"})
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with Id 3 was not found")
      }
    })

  })

});
