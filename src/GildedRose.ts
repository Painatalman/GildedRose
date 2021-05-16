export class Item {
  name: string;
  sellIn: number;
  quality: number;
  rate: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.rate = name === "Conjured" ? 2 : 1;
  }

  updateQuality() {
    this.quality -= 1 * this.rate;
    this.sellIn -= 1;
    if (this.sellIn < 0) {
      this.quality -= 1 * this.rate;
    }
    if (this.quality < 0) {
      this.quality = 0;
    }
  }
}

class SulfurasItem extends Item {
  updateQuality() {
    return;
  }
}

class BackstagePassItem extends Item {
  updateQuality() {
    if (this.sellIn < 1) {
      this.quality = 0;
    } else if (this.sellIn < 6) {
      this.quality += 3;
    } else if (this.sellIn < 11) {
      this.quality += 2;
    } else {
      this.quality += 1;
    }
    if (this.quality > 50) {
      this.quality = 50;
    }
    this.sellIn -= 1;
  }
}

class AgedBrieItem extends Item {
  updateQuality() {
    if (this.quality < 50) {
      this.quality += 1;
    }
    this.sellIn -= 1;
  }
}

function createItem(item: Item): Item {
  const { name, sellIn, quality } = item;

  switch (name) {
    case "Backstage passes to a TAFKAL80ETC concert":
      return new BackstagePassItem(name, sellIn, quality);
    case "Sulfuras, Hand of Ragnaros":
      return new SulfurasItem(name, sellIn, quality);
    case "Aged Brie":
      return new AgedBrieItem(name, sellIn, quality);
    default:
      return item;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items.map((item) => createItem(item));
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].updateQuality();
    }

    return this.items;
  }
}
