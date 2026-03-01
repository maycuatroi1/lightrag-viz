class InfographicScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Infographic' });
        this.sections = [];
        this.scrollY = 0;
        this.targetScrollY = 0;
        this.scrollSpeed = 0.12;
        this.sectionIndicators = [];
    }

    create() {
        this.cameras.main.setBackgroundColor(COLORS.bg);

        this.sections = [
            new HeroSection(this, sectionY(0)),
            new ProblemSection(this, sectionY(1)),
            new PipelineSection(this, sectionY(2)),
            new RetrievalSection(this, sectionY(3)),
            new CompareSection(this, sectionY(4)),
            new BenefitsSection(this, sectionY(5)),
            new ChunkingSection(this, sectionY(6)),
            new DemoSection(this, sectionY(7)),
        ];

        this.sections.forEach(s => s.create());

        this.createNavDots();
        this.createProgressBar();
        this.setupScrolling();
    }

    createNavDots() {
        const labels = ['Gi\u1EDBi thi\u1EC7u', 'V\u1EA5n \u0111\u1EC1', 'Pipeline', 'Retrieval', 'So s\u00E1nh', 'K\u1EF9 thu\u1EADt', 'Chunking', 'Demo'];
        this.navContainer = this.add.container(WORLD_WIDTH - 30, 100);
        this.navContainer.setScrollFactor(0);

        labels.forEach((label, i) => {
            const dot = this.add.circle(0, i * 30, 5, COLORS.line, 0.5);
            dot.setInteractive({ useHandCursor: true });
            dot.on('pointerdown', () => {
                this.targetScrollY = sectionY(i);
            });
            dot.on('pointerover', () => {
                dot.setScale(1.5);
                if (this.navLabel) this.navLabel.destroy();
                this.navLabel = this.add.text(-15, i * 30, label, {
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                    fontSize: '11px',
                    color: hexToStr(COLORS.text),
                    backgroundColor: hexToStr(COLORS.bgAlt),
                    padding: { x: 6, y: 3 },
                }).setOrigin(1, 0.5).setScrollFactor(0);
                this.navContainer.add(this.navLabel);
            });
            dot.on('pointerout', () => {
                dot.setScale(1);
                if (this.navLabel) { this.navLabel.destroy(); this.navLabel = null; }
            });
            this.navContainer.add(dot);
            this.sectionIndicators.push(dot);
        });
    }

    createProgressBar() {
        this.progressBg = this.add.rectangle(WORLD_WIDTH / 2, 0, WORLD_WIDTH, 3, COLORS.line, 0.2)
            .setOrigin(0.5, 0).setScrollFactor(0).setDepth(100);
        this.progressBar = this.add.rectangle(0, 0, 0, 3, COLORS.primary, 0.8)
            .setOrigin(0, 0).setScrollFactor(0).setDepth(100);
    }

    setupScrolling() {
        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
            this.targetScrollY += deltaY * 0.8;
            this.targetScrollY = Phaser.Math.Clamp(this.targetScrollY, 0, WORLD_HEIGHT - this.cameras.main.height);
        });

        let touchStartY = 0;
        let lastTouchY = 0;
        this.input.on('pointerdown', (pointer) => {
            touchStartY = pointer.y;
            lastTouchY = pointer.y;
        });
        this.input.on('pointermove', (pointer) => {
            if (pointer.isDown) {
                const dy = lastTouchY - pointer.y;
                this.targetScrollY += dy * 1.5;
                this.targetScrollY = Phaser.Math.Clamp(this.targetScrollY, 0, WORLD_HEIGHT - this.cameras.main.height);
                lastTouchY = pointer.y;
            }
        });

        this.input.keyboard.on('keydown-SPACE', () => {
            const currentSection = Math.floor(this.scrollY / SECTION_HEIGHT);
            const nextSection = Math.min(currentSection + 1, TOTAL_SECTIONS - 1);
            this.targetScrollY = sectionY(nextSection);
        });
        this.input.keyboard.on('keydown-UP', () => {
            this.targetScrollY -= 100;
            this.targetScrollY = Math.max(0, this.targetScrollY);
        });
        this.input.keyboard.on('keydown-DOWN', () => {
            this.targetScrollY += 100;
            this.targetScrollY = Math.min(WORLD_HEIGHT - this.cameras.main.height, this.targetScrollY);
        });
    }

    update() {
        this.scrollY += (this.targetScrollY - this.scrollY) * this.scrollSpeed;
        this.cameras.main.scrollY = this.scrollY;

        const progress = this.scrollY / (WORLD_HEIGHT - this.cameras.main.height);
        this.progressBar.width = WORLD_WIDTH * Math.min(progress, 1);

        const currentSection = Math.floor((this.scrollY + this.cameras.main.height / 2) / SECTION_HEIGHT);
        this.sectionIndicators.forEach((dot, i) => {
            if (i === currentSection) {
                dot.fillColor = COLORS.primary;
                dot.fillAlpha = 1;
                dot.setRadius(7);
            } else {
                dot.fillColor = COLORS.line;
                dot.fillAlpha = 0.5;
                dot.setRadius(5);
            }
        });
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: WORLD_WIDTH,
    height: 700,
    backgroundColor: hexToStr(COLORS.bg),
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: InfographicScene,
};

window.addEventListener('load', async () => {
    await document.fonts.ready;
    document.getElementById('loading').style.display = 'none';
    new Phaser.Game(config);
});
