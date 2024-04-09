// Purpose: Concrete Decorator for ArmourDecorator.
import EnemyDecorator from './EnemyDecorator.ts';
import Enemy from './Enemy.ts';

export default class ArmourDecorator extends EnemyDecorator {
    
    public takeDamage(damage: number): number {
        return this.enemy.takeDamage(damage / 1.5);
    }

    public attackEnemy(enemy: Enemy): void {
        this.enemy.attackEnemy(enemy);
    }
}