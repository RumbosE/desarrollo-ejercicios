import Enemy from './Enemy.ts';

export default abstract class EnemyDecorator implements Enemy {

    protected enemy: Enemy;

    constructor(enemy: Enemy) {
        this.enemy = enemy;
    }

    public takeDamage(damage: number): number {
        return this.enemy.takeDamage(damage);
    }

    public attackEnemy(enemy: Enemy): void {
        this.enemy.attackEnemy(enemy);
    }

    public get health(): number {
        return this.enemy.health;
    }

    public get attack(): number {
        return this.enemy.attack;
    }
}