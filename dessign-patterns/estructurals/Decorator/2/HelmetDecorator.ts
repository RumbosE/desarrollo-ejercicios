import EnemyDecorator from "./EnemyDecorator.ts";
import Enemy from "./Enemy.ts";

export default class HelmetDecorator extends EnemyDecorator {
    
    public takeDamage(damage: number): number {
        return this.enemy.takeDamage(damage / 2);
    }

    public attackEnemy(enemy: Enemy): void {
        this.enemy.attackEnemy(enemy);
    }
}