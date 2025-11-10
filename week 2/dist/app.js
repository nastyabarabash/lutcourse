"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Hello World!");
let Vehicle = {
    model: "Boring generic vehicle",
    color: "Red",
    year: 1993,
    power: 60
};
console.log(Vehicle);
let Car = {
    model: "Ford focus",
    color: "Green",
    year: 2016,
    power: 150,
    bodyType: "Hatchback",
    wheelCount: 4
};
let Boat = {
    model: "Bella",
    color: "Black",
    year: 2022,
    power: 100,
    draft: 0.42
};
let Plane = {
    model: "Boeing 777",
    color: "White",
    year: 2020,
    power: 170000,
    wingspan: 65
};
console.log(Car);
console.log(Boat);
console.log(Plane);
class VehicleService {
    items = [];
    add(item) {
        this.items.push(item);
    }
    list() {
        return this.items;
    }
}
const carService = new VehicleService();
const boatService = new VehicleService();
carService.add(Car);
boatService.add(Boat);
const cars = carService.list();
const boats = boatService.list();
console.log("Cars:", cars);
console.log("Boats:", boats);
//# sourceMappingURL=app.js.map