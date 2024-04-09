enum CharacterType{
    Warrior,
    Mage,
    Archer
}

class Character{

    level: number;
    strength: number;
    ability: number;
    defense: number;
    constructor(private name: string, private classType: CharacterType){}

    displayStats(){
        console.log(`Name: ${this.name}`);
        console.log(`Class: ${CharacterType[this.classType]}`);
        console.log(`Level: ${this.level}`);
        console.log(`Strength: ${this.strength}`);
        console.log(`Ability: ${this.ability}`);
        console.log(`Defense: ${this.defense}`);
    }
}

class CharacterBuilder{
    
    private character: Character;

    constructor(name: string, classType: CharacterType){
        this.character = new Character(name, classType);
    }

    setLevel(level: number){
        this.character.level = level;
        return this;
    }

    setStrength(strength: number){
        this.character.strength = strength;
        return this;
    }

    setAbility(ability: number){
        this.character.ability = ability;
        return this;
    }

    setDefense(defense: number){
        this.character.defense = defense;
        return this;
    }

    build(){
        return this.character;
    }
}

let archerBuilder = new CharacterBuilder('Eduardo', CharacterType.Archer)
let eduardo = archerBuilder
    .setLevel(10)
    .setStrength(10)
    .setAbility(5)
    // .setDefense(3)
    .build();

eduardo.displayStats();
