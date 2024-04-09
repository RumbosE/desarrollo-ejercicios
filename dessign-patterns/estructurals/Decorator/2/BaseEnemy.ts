import Enemy from "./Enemy.ts";

export default class BaseEnemy implements Enemy {
    public health: number = 50;
    public attack: number = 10;
    
    public takeDamage(damage: number): number {
        return this.health -= damage;
    }
    
    public attackEnemy(enemy: BaseEnemy) {
        enemy.takeDamage(this.attack);
    }
}