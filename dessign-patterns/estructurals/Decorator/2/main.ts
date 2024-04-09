import ArmourDecorator from './ArmourDecorator.ts';
import BaseEnemy from './BaseEnemy.ts';
import HelmetDecorator from './HelmetDecorator.ts';

let enemy = new BaseEnemy();
let enemyWithHelmet = new HelmetDecorator(enemy);
let enemyWithHelmetAndArmour = new ArmourDecorator(enemyWithHelmet);


let computedDamage = enemyWithHelmetAndArmour.takeDamage(10);

console.log(`con ese ataque al enemigo le quedan ${computedDamage} de vida`);