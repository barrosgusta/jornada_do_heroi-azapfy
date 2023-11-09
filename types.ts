export class Hero {
    id: number = 0;
    name: string = '';
    slug: string = '';
    powerstats = {
      intelligence: 0,
      strength: 0,
      speed: 0,
      durability: 0,
      power: 0,
      combat: 0
    };
    appearance = {
      gender: '',
      race: '',
      height: ['', ''],
      weight: ['', ''],
      eyeColor: '',
      hairColor: ''
    };
    biography = {
      fullName: '',
      alterEgos: '',
      aliases: [],
      placeOfBirth: '',
      firstAppearance: '',
      publisher: '',
      alignment: ''
    };
    work = {
      occupation: '',
      base: ''
    };
    connections = {
      groupAffiliation: '',
      relatives: ''
    };
    images = {
      xs: '',
      sm: '',
      md: '',
      lg: ''
    };

    constructor(hero: Partial<Hero>) {
        Object.assign(this, hero);
    }
}