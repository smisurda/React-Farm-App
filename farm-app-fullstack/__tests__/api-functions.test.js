/**
 * Basic tests for the API
 */
const request = require("supertest");
const app = require("../server/index.js");

/**
 * Basic retrieval of Farms
 */
describe('GET /farms', () => {
  it('should get a list of all six farms', async () => {
    const response = await request(app).get("/api/farms");
    expect(response.statusCode).toBe(200);
   	
   	var farms = response.body;
   	var farmNames = [];
   	var allFarms = [
      'McDonald',
      'Stardew Valley',
      'Green Acres',
      'Animal Farm',
      'Stargazer Glen',
      'Hundred Acre Woods'
    ];

    for (var farm in farms) {
    	farmNames.push(farms[farm].name);
	}

    expect(farmNames).toEqual(allFarms);
  })
})

describe('GET farm/1', () => {
  it('should return the farm in the JSON list with ID 1', async () => {
    const response = await request(app).get("/api/farm/1");
    expect(response.statusCode).toBe(200);

   	var farm1Name = 'McDonald'
    expect(response.body.name).toEqual(farm1Name);
  })
})

  /**
   * Revenue Range Tests
   */
describe('GET /api/farms/revenue/', () => {
  it('should return the farm falling in the revenue range', async () => {
    const response = await request(app).get("/api/farms/revenue/?min=0&max=20000");
    expect(response.statusCode).toBe(200);

    const farmIDs = ['6'];
	var responseIDs = response.body.farmIDs;
    expect(responseIDs).toEqual(farmIDs);

  })
})

describe('GET /api/farms/revenue/', () => {
  it('should cover a request with no Max', async () => {
    const response = await request(app).get("/api/farms/revenue/?min=0");
    expect(response.statusCode).toBe(200);

    const farmIDs = [ '1', '2', '3', '4', '5', '6' ];
	var responseIDs = response.body.farmIDs;
	expect(responseIDs).toEqual(farmIDs);

  })
})

describe('GET /api/farms/revenue/', () => {
  it('should cover a request with no Min', async () => {
    const response = await request(app).get("/api/farms/revenue/?max=5000000");
    expect(response.statusCode).toBe(200);

    const farmIDs = [ '1', '2', '3', '4', '5', '6' ];
	var responseIDs = response.body.farmIDs;
    expect(responseIDs).toEqual(farmIDs);

  })
})

describe('GET /api/farms/revenue/', () => {
  it('should cover a request with no Max or Min', async () => {
    const response = await request(app).get("/api/farms/revenue/");
    expect(response.statusCode).toBe(200);

    const farmIDs = [ '1', '2', '3', '4', '5', '6' ];
	var responseIDs = response.body.farmIDs;
    expect(responseIDs).toEqual(farmIDs);

  })
})

describe('GET /api/farms/revenue/', () => {
  it('should cover a request where the Min is greater than the Max, returning no results', async () => {
    const response = await request(app).get("/api/farms/revenue/?min=200000&max=20000");
    expect(response.statusCode).toBe(200);
    expect(response.body.farmIDs).toEqual([]);
  })
}) 

  /**
   * Search Tests
   */ 

describe('GET farms/search/:name?', () => {
  it('should return the farms matching the search string', async () => {
    const response = await request(app).get("/api/farms/search/?name=star");
    expect(response.statusCode).toBe(200);
    
    var farmIDs = ['2','5'];
	var responseIDs = response.body.farmIDs
    expect(responseIDs).toEqual(farmIDs);
  })

  it('should return no results when there is no match', async () => {
    const response = await request(app).get("/api/farms/search/?name=worstfarmever");
    expect(response.statusCode).toBe(200);
    
    var farmIDs = [];
	var responseIDs = response.body.farmIDs
    expect(responseIDs).toEqual(farmIDs);
  })

  it('should return a result insensitive of case', async () => {
    const response = await request(app).get("/api/farms/search/?name=STAR");
    expect(response.statusCode).toBe(200);
    
    var farmIDs = ['2','5'];
	var responseIDs = response.body.farmIDs
    expect(responseIDs).toEqual(farmIDs);
  })
})
