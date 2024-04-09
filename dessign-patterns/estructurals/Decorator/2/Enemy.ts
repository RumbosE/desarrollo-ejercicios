export default interface Enemy {
    health: number;
    attack: number;
    takeDamage(damage: number): number;
    attackEnemy(enemy: Enemy): void;
}