import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

function itemWithNamedProperties({name, sellIn, quality}: { name: string, sellIn: number, quality: number}) {
    return new Item(name, sellIn, quality);
}

describe('Gilded Rose', function () {
    describe('for generic items', () => {
        const itemName = 'generic item';
        describe('should reduce sell by date', function() {
            [-2, -1, 0, 1, 2, 3, 4, 5].forEach((sellByDate) => {
                it(`from ${sellByDate} to ${sellByDate-1}`, () => {
                    const gildedRose = new GildedRose([
                        itemWithNamedProperties({
                            name: itemName,
                            sellIn: sellByDate,
                            quality: 0
                        })
                    ]);
                    const items = gildedRose.updateQuality();
                    expect(items[0].sellIn).to.equal(sellByDate-1);
                })
            });
        });
        describe('when not expired', () => {
            const notExpiredSellByDate = 1;
            describe('should reduce quality by 1, lower bound by 0', function() {
                [
                    {in: 0, out: 0},
                    {in: 1, out: 0},
                    {in: 2, out: 1},
                    {in: 3, out: 2},
                ].forEach((testCase) => {
                    const originalQuality = testCase.in;
                    const expectedQuality = testCase.out;
                    it(`from ${originalQuality} to ${expectedQuality}`, () => {
                        const gildedRose = new GildedRose([
                            itemWithNamedProperties({
                                name: itemName,
                                sellIn: notExpiredSellByDate,
                                quality: originalQuality
                            })
                        ]);
                        const items = gildedRose.updateQuality();
                        expect(items[0].quality).to.equal(expectedQuality);
                    })
                });
            });
        });
        describe('when expired', () => {
            const expiredSellByDate = 0;
            describe('should reduce quality by 2, lower bound by 0', function() {
                [
                    {in: 0, out: 0},
                    {in: 1, out: 0},
                    {in: 2, out: 0},
                    {in: 3, out: 1},
                    {in: 4, out: 2},
                ].forEach((testCase) => {
                    const originalQuality = testCase.in;
                    const expectedQuality = testCase.out;
                    it(`from ${originalQuality} to ${expectedQuality}`, () => {
                        const gildedRose = new GildedRose([
                            itemWithNamedProperties({
                                name: itemName,
                                sellIn: expiredSellByDate,
                                quality: originalQuality
                            })
                        ]);
                        const items = gildedRose.updateQuality();
                        expect(items[0].quality).to.equal(expectedQuality);
                    })
                });
            });
        });
    });
    describe('for Aged Brie', () => {
        const itemName = 'Aged Brie';
        describe('should reduce sell by date', function() {
            [-2, -1, 0, 1, 2, 3, 4, 5].forEach((sellByDate) => {
                it(`from ${sellByDate} to ${sellByDate-1}`, () => {
                    const gildedRose = new GildedRose([
                        itemWithNamedProperties({
                            name: itemName,
                            sellIn: sellByDate,
                            quality: 0
                        })
                    ]);
                    const items = gildedRose.updateQuality();
                    expect(items[0].sellIn).to.equal(sellByDate-1);
                })
            });
        });
        describe('when not expired', () => {
            const notExpiredSellByDate = 1;
            describe('should increase quality by 1, upper bound by 50', function() {
                [
                    {in: 0, out: 1},
                    {in: 1, out: 2},
                    {in: 2, out: 3},
                    {in: 50, out: 50},
                ].forEach((testCase) => {
                    const originalQuality = testCase.in;
                    const expectedQuality = testCase.out;
                    it(`from ${originalQuality} to ${expectedQuality}`, () => {
                        const gildedRose = new GildedRose([
                            itemWithNamedProperties({
                                name: itemName,
                                sellIn: notExpiredSellByDate,
                                quality: originalQuality
                            })
                        ]);
                        const items = gildedRose.updateQuality();
                        expect(items[0].quality).to.equal(expectedQuality);
                    })
                });
            })
        });
        describe('when expired', () => {
            const expiredSellByDate = 0;
            describe('should increase quality by 2, upper bound by 50', function() {
                [
                    {in: 0, out: 2},
                    {in: 1, out: 3},
                    {in: 2, out: 4},
                    {in: 3, out: 5},
                    {in: 50, out: 50},
                ].forEach((testCase) => {
                    const originalQuality = testCase.in;
                    const expectedQuality = testCase.out;
                    it(`from ${originalQuality} to ${expectedQuality}`, () => {
                        const gildedRose = new GildedRose([
                            itemWithNamedProperties({
                                name: itemName,
                                sellIn: expiredSellByDate,
                                quality: originalQuality
                            })
                        ]);
                        const items = gildedRose.updateQuality();
                        expect(items[0].quality).to.equal(expectedQuality);
                    })
                });
            });
        });
    });
    describe('for Sulfuras, Hand of Ragnaros', () => {
        const itemName = 'Sulfuras, Hand of Ragnaros';
        describe('should always maintain sell by date', function() {
            [-2, -1, 0, 1, 2, 3, 4, 5].forEach((sellByDate) => {
                it(`from ${sellByDate} to ${sellByDate}`, () => {
                    const gildedRose = new GildedRose([
                        itemWithNamedProperties({
                            name: itemName,
                            sellIn: sellByDate,
                            quality: 0
                        })
                    ]);
                    const items = gildedRose.updateQuality();
                    expect(items[0].sellIn).to.equal(sellByDate);
                })
            });
        });
        describe('should always maintain quality', function() {
            [-2, -1, 0, 1, 2, 3, 4, 5].forEach((quality) => {
                it(`from ${quality} to ${quality}`, () => {
                    const gildedRose = new GildedRose([
                        itemWithNamedProperties({
                            name: itemName,
                            sellIn: 0,
                            quality: quality
                        })
                    ]);
                    const items = gildedRose.updateQuality();
                    expect(items[0].quality).to.equal(quality);
                })
            });
        });
    });
    describe('for Backstage passes to a TAFKAL80ETC concert', () => {
        const itemName = 'Backstage passes to a TAFKAL80ETC concert';
        describe('should reduce sell by date', function() {
            [-2, -1, 0, 1, 2, 3, 4, 5].forEach((sellByDate) => {
                it(`from ${sellByDate} to ${sellByDate-1}`, () => {
                    const gildedRose = new GildedRose([
                        itemWithNamedProperties({
                            name: itemName,
                            sellIn: sellByDate,
                            quality: 0
                        })
                    ]);
                    const items = gildedRose.updateQuality();
                    expect(items[0].sellIn).to.equal(sellByDate-1);
                })
            });
        });
        describe('when not expired', () => {
            describe('when more than 10 days remaining', () => {
                [ 11, 12, 13 ].forEach((sellByDate) => {
                    describe(`at ${sellByDate} days remaining, should increase quality by 1, upper bound by 50`, function() {
                        [
                            {in: 0, out: 1},
                            {in: 1, out: 2},
                            {in: 2, out: 3},
                            {in: 50, out: 50},
                        ].forEach((testCase) => {
                            const originalQuality = testCase.in;
                            const expectedQuality = testCase.out;
                            it(`from ${originalQuality} to ${expectedQuality}`, () => {
                                const gildedRose = new GildedRose([
                                    itemWithNamedProperties({
                                        name: itemName,
                                        sellIn: sellByDate,
                                        quality: originalQuality
                                    })
                                ]);
                                const items = gildedRose.updateQuality();
                                expect(items[0].quality).to.equal(expectedQuality);
                            })
                        });
                    })
                })
            })
            describe('when 10 or less days remaining, but more than 5', () => {
                [ 6, 7, 8, 9, 10 ].forEach((sellByDate) => {
                        describe(`at ${sellByDate} days remaining, should increase quality by 2, upper bound by 50`, function() {
                        [
                            {in: 0, out: 2},
                            {in: 1, out: 3},
                            {in: 2, out: 4},
                            {in: 3, out: 5},
                            {in: 50, out: 50},
                        ].forEach((testCase) => {
                            const originalQuality = testCase.in;
                            const expectedQuality = testCase.out;
                            it(`from ${originalQuality} to ${expectedQuality}`, () => {
                                const gildedRose = new GildedRose([
                                    itemWithNamedProperties({
                                        name: itemName,
                                        sellIn: sellByDate,
                                        quality: originalQuality
                                    })
                                ]);
                                const items = gildedRose.updateQuality();
                                expect(items[0].quality).to.equal(expectedQuality);
                            })
                        });
                    })
                })
            })
        });
        describe('when 5 or less days remaining', () => {
                [ 1, 2, 3, 4, 5 ].forEach((sellByDate) => {
                    describe(`at ${sellByDate} days remaining, should increase quality by 3, upper bound by 50`, function() {
                    [
                        {in: 0, out: 3},
                        {in: 1, out: 4},
                        {in: 2, out: 5},
                        {in: 3, out: 6},
                        {in: 50, out: 50},
                    ].forEach((testCase) => {
                        const originalQuality = testCase.in;
                        const expectedQuality = testCase.out;
                        it(`from ${originalQuality} to ${expectedQuality}`, () => {
                            const gildedRose = new GildedRose([
                                itemWithNamedProperties({
                                    name: itemName,
                                    sellIn: sellByDate,
                                    quality: originalQuality
                                })
                            ]);
                            const items = gildedRose.updateQuality();
                            expect(items[0].quality).to.equal(expectedQuality);
                        })
                    });
                })
            })
        });
        describe('when expired', () => {
            const expiredSellByDate = 0;
            describe('should immediately reduce quality to 0', function() {
                [
                    {in: 0, out: 0},
                    {in: 1, out: 0},
                    {in: 2, out: 0},
                    {in: 3, out: 0},
                    {in: 50, out: 0},
                ].forEach((testCase) => {
                    const originalQuality = testCase.in;
                    const expectedQuality = testCase.out;
                    it(`from ${originalQuality} to ${expectedQuality}`, () => {
                        const gildedRose = new GildedRose([
                            itemWithNamedProperties({
                                name: itemName,
                                sellIn: expiredSellByDate,
                                quality: originalQuality
                            })
                        ]);
                        const items = gildedRose.updateQuality();
                        expect(items[0].quality).to.equal(expectedQuality);
                    })
                });
            });
        });
    });
    describe('for counjoured generic items', () => {
        const itemName = 'Conjured generic item';
        describe('should reduce sell by date', function() {
            [-2, -1, 0, 1, 2, 3, 4, 5].forEach((sellByDate) => {
                it(`from ${sellByDate} to ${sellByDate-1}`, () => {
                    const gildedRose = new GildedRose([
                        itemWithNamedProperties({
                            name: itemName,
                            sellIn: sellByDate,
                            quality: 0
                        })
                    ]);
                    const items = gildedRose.updateQuality();
                    expect(items[0].sellIn).to.equal(sellByDate-1);
                })
            });
        });
        describe('when not expired', () => {
            const notExpiredSellByDate = 1;
            describe('should reduce quality by 2, lower bound by 0', function() {
                [
                    {in: 0, out: 0},
                    {in: 1, out: 0},
                    {in: 2, out: 0},
                    {in: 3, out: 1},
                    {in: 4, out: 2},
                ].forEach((testCase) => {
                    const originalQuality = testCase.in;
                    const expectedQuality = testCase.out;
                    it(`from ${originalQuality} to ${expectedQuality}`, () => {
                        const gildedRose = new GildedRose([
                            itemWithNamedProperties({
                                name: itemName,
                                sellIn: notExpiredSellByDate,
                                quality: originalQuality
                            })
                        ]);
                        const items = gildedRose.updateQuality();
                        expect(items[0].quality).to.equal(expectedQuality);
                    })
                });
            });
        });
        describe('when expired', () => {
            const expiredSellByDate = 0;
            describe('should reduce quality by 4, lower bound by 0', function() {
                [
                    {in: 0, out: 0},
                    {in: 1, out: 0},
                    {in: 2, out: 0},
                    {in: 3, out: 0},
                    {in: 4, out: 0},
                    {in: 5, out: 1},
                    {in: 6, out: 2},
                ].forEach((testCase) => {
                    const originalQuality = testCase.in;
                    const expectedQuality = testCase.out;
                    it(`from ${originalQuality} to ${expectedQuality}`, () => {
                        const gildedRose = new GildedRose([
                            itemWithNamedProperties({
                                name: itemName,
                                sellIn: expiredSellByDate,
                                quality: originalQuality
                            })
                        ]);
                        const items = gildedRose.updateQuality();
                        expect(items[0].quality).to.equal(expectedQuality);
                    })
                });
            });
        });
    });
    describe('for a Conjured Sulfuras, Hand of Ragnaros', () => {
        const itemName = 'Conjured Sulfuras, Hand of Ragnaros';
        describe('should always maintain sell by date', function() {
            [-2, -1, 0, 1, 2, 3, 4, 5].forEach((sellByDate) => {
                it(`from ${sellByDate} to ${sellByDate}`, () => {
                    const gildedRose = new GildedRose([
                        itemWithNamedProperties({
                            name: itemName,
                            sellIn: sellByDate,
                            quality: 0
                        })
                    ]);
                    const items = gildedRose.updateQuality();
                    expect(items[0].sellIn).to.equal(sellByDate);
                })
            });
        });
        describe('should always maintain quality', function() {
            [-2, -1, 0, 1, 2, 3, 4, 5].forEach((quality) => {
                it(`from ${quality} to ${quality}`, () => {
                    const gildedRose = new GildedRose([
                        itemWithNamedProperties({
                            name: itemName,
                            sellIn: 0,
                            quality: quality
                        })
                    ]);
                    const items = gildedRose.updateQuality();
                    expect(items[0].quality).to.equal(quality);
                })
            });
        });
    });
});
