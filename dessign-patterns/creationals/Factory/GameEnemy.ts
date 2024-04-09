interface Entity {
    attack(): void;
    move(): void;
}

interface EnemyFactory {
    createEnemy(): Entity;
}

class boo implements Entity {
    attack(): void {
        console.log('Boo attack');
    }
    move(): void {
        console.log('Boo move');
    }
}

class goomba implements Entity {
    attack(): void {
        console.log('Goomba attack');
    }
    move(): void {
        console.log('Goomba move');
    }
}

class koopa implements Entity {
    attack(): void {
        console.log('Koopa attack');
    }
    move(): void {
        console.log('Koopa move');
    }
}

class BooFactory implements EnemyFactory {
    createEnemy(): Entity {
        return new boo();
    }
}

class GoombaFactory implements EnemyFactory {
    createEnemy(): Entity {
        return new goomba();
    }
}

class KoopaFactory implements EnemyFactory {
    createEnemy(): Entity {
        return new koopa();
    }
}

class RandomEmemyFactory {
    createEnemy(): Entity {
        const random = Math.floor(Math.random() * 3);
        switch (random) {
            case 0:
                return new boo();
            case 1:
                return new goomba();
            case 2:
                return new koopa();
        }
        return new boo(); // default return
    }
}

class DifficultyEnemyFactory {
    createEnemy(difficulty: number): Entity {
        if (difficulty < 3) {
            return new boo();
        } else if (difficulty < 6) {
            return new goomba();
        } else {
            return new koopa();
        }
    }
}

const randomFactory = new RandomEmemyFactory();
console.log(randomFactory.createEnemy().attack());

const difficultyFactory = new DifficultyEnemyFactory();
console.log(difficultyFactory.createEnemy(5).attack());
