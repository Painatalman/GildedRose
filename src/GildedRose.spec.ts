import { Item, GildedRose } from "./GildedRose";

describe("Gilded Rose", function () {
  describe("items overall", () => {
    it("decreases in value", () => {
      const gildedRose = new GildedRose([new Item("foo", 1, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("foo");
      expect(items[0].quality).toBe(0);
      expect(items[0].sellIn).toBe(0);
    });

    it("decreases in value twice after sellIn limit", () => {
      const gildedRose = new GildedRose([new Item("foo", 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(8);
      expect(items[0].sellIn).toBe(-1);
    });

    it("can't go below zero quality", () => {
      const gildedRose = new GildedRose([new Item("foo", 1, 1)]);
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
      expect(items[0].sellIn).toBe(-1);

      const gildedRoseProneToGettingNegative = new GildedRose([
        new Item("foo", 0, 1),
      ]);
      expect(gildedRoseProneToGettingNegative.updateQuality()[0].quality).toBe(
        0
      );
    });
  });

  describe("Aged Brie", () => {
    it("inceases in value", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 1, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(2);
      expect(items[0].sellIn).toBe(0);
    });

    it("can't go above 50 in quality", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 1, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });
  });

  describe("Sulfuras, Hand of Ragnaros", () => {
    it("does not decrease in quality", () => {
      const gildedRose = new GildedRose([
        new Item("Sulfuras, Hand of Ragnaros", 10, 80),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(80);
      expect(items[0].sellIn).toBe(10);
    });
  });

  describe("Backstage passes to a TAFKAL80ETC concert", () => {
    it("increase in quality by 1 before final 10 days", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(21);
    });

    it("increase in quality by 2 with 10 days left", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(22);
    });

    it("increase in quality by 3 with 5 days left", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(23);
    });

    it("cannot increase in value from 50", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 3, 49),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });

    it("loses value after concert ends", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });

  describe("Conjured items", () => {
    it("decreased in value twice as fast", () => {
      const gildedRose = new GildedRose([new Item("Conjured", 1, 20)]);
      expect(gildedRose.updateQuality()[0].quality).toBe(18);
      expect(gildedRose.updateQuality()[0].quality).toBe(14);
    });
  });
});
