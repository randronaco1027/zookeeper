const fs = require('fs')

const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers.js')

const { zookeepers } = require('../data/zookeepers')

jest.mock('fs')

test('creates an animal object', () => {
    const zookeeper = createNewZookeeper(
        { name: 'Darlene', id: 'fvjfjdjf' },
        zookeepers
    )
    expect(zookeeper.name).toBe('Darlene')
    expect(zookeeper.id).toBe('fvjfjdjf')
})

test('filters by query', () => {
    const startingZookeepers = [
        {
            id: '3',
            name: "Erica",
            age: "31",
            favoriteAnimal: "penguin",
        },
        {
            id: "4",
            name: "Noel",
            age: "67",
            favoriteAnimal: "bear",
        },
    ]
    const updatedZookeepers = filterByQuery({ age: '31' }, startingZookeepers)
    expect(updatedZookeepers.length).toEqual(1)
})

test('finds by id', () => {
    const startingZookeepers = [
        {
            id: '3',
            name: "Erica",
            age: "31",
            favoriteAnimal: "penguin",
        },
        {
            id: "4",
            name: "Noel",
            age: "67",
            favoriteAnimal: "bear",
        },
    ]
    const result = findById('3', startingZookeepers)
    expect(result.name).toBe('Noel')
})

test('validates age', () => {
    const zookeeper = {
        id: '3',
        name: "Erica",
        age: "31",
        favoriteAnimal: "penguin",
    }
    const invalidzookeeper = {
        id: '4',
        name: "Noel",
        age: "67",
        favoriteAnimal: "bear",
    }
    const result = validateZookeeper(zookeeper)
    const result2 = validateZookeeper(invalidzookeeper)

    expect(result).toBe(true)
    expect(result2).toBe(false)
})