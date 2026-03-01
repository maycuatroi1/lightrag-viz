class HeroSection {
    constructor(scene, yOffset) {
        this.scene = scene;
        this.yOffset = yOffset;
        this.elements = [];
        this.animated = false;
    }

    create() {
        const cx = WORLD_WIDTH / 2;
        const y = this.yOffset;
        const g = this.scene.add.graphics();

        g.fillStyle(COLORS.primary, 0.03);
        g.fillRect(0, y, WORLD_WIDTH, SECTION_HEIGHT);

        for (let i = 0; i < 30; i++) {
            const px = Phaser.Math.Between(50, WORLD_WIDTH - 50);
            const py = Phaser.Math.Between(y + 50, y + SECTION_HEIGHT - 50);
            const r = Phaser.Math.Between(3, 8);
            const colors = [COLORS.primary, COLORS.secondary, COLORS.accent, COLORS.success, COLORS.nodePink];
            const c = Phaser.Utils.Array.GetRandom(colors);
            g.fillStyle(c, 0.15);
            g.fillCircle(px, py, r);

            const particle = this.scene.add.circle(px, py, r, c, 0.2);
            this.scene.tweens.add({
                targets: particle,
                y: py - Phaser.Math.Between(10, 30),
                alpha: { from: 0.2, to: 0.5 },
                duration: Phaser.Math.Between(2000, 4000),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut',
                delay: Phaser.Math.Between(0, 2000),
            });
        }

        const iconG = this.scene.add.graphics();
        drawNode(iconG, cx - 80, y + 220, 25, COLORS.primary);
        drawNode(iconG, cx + 80, y + 220, 20, COLORS.secondary);
        drawNode(iconG, cx, y + 180, 30, COLORS.accent);
        drawNode(iconG, cx - 40, y + 280, 18, COLORS.success);
        drawNode(iconG, cx + 50, y + 270, 22, COLORS.nodePink);

        iconG.lineStyle(2, COLORS.primary, 0.3);
        iconG.lineBetween(cx, y + 180, cx - 80, y + 220);
        iconG.lineBetween(cx, y + 180, cx + 80, y + 220);
        iconG.lineBetween(cx - 80, y + 220, cx - 40, y + 280);
        iconG.lineBetween(cx + 80, y + 220, cx + 50, y + 270);
        iconG.lineBetween(cx - 40, y + 280, cx + 50, y + 270);

        pulseElement(this.scene, iconG, 1.02);

        const badge = this.scene.add.text(cx, y + 340, 'EMNLP 2025', {
            fontFamily: '"Be Vietnam Pro", sans-serif',
            fontSize: '14px',
            fontStyle: 'bold',
            color: hexToStr(COLORS.textWhite),
            backgroundColor: hexToStr(COLORS.secondary),
            padding: { x: 16, y: 6 },
        }).setOrigin(0.5, 0);

        const title = this.scene.add.text(cx, y + 380, 'LightRAG', {
            fontFamily: '"Be Vietnam Pro", sans-serif',
            fontSize: '72px',
            fontStyle: 'bold',
            color: hexToStr(COLORS.primaryDark),
        }).setOrigin(0.5, 0);

        const subtitle = createSubtitle(this.scene, cx, y + 470,
            'Simple and Fast Retrieval-Augmented Generation\nK\u1EBFt h\u1EE3p Knowledge Graph v\u1EDBi Vector Search', 22);

        const desc = createSubtitle(this.scene, cx, y + 540,
            'Graph-based indexing + Dual-level retrieval\n\u0111\u1EC3 hi\u1EC3u ng\u1EEF c\u1EA3nh s\u00E2u h\u01A1n RAG truy\u1EC1n th\u1ED1ng', 16);

        const scrollHint = this.scene.add.text(cx, y + SECTION_HEIGHT - 60, 'Cu\u1ED9n xu\u1ED1ng \u0111\u1EC3 kh\u00E1m ph\u00E1', {
            fontFamily: '"Be Vietnam Pro", sans-serif',
            fontSize: '15px',
            color: hexToStr(COLORS.textLight),
        }).setOrigin(0.5, 0.5);

        this.scene.tweens.add({
            targets: scrollHint,
            y: scrollHint.y - 10,
            alpha: { from: 1, to: 0.4 },
            duration: 1200,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
        });

        this.elements.push(badge, title, subtitle, desc);
        this.elements.forEach((el, i) => slideInFromBottom(this.scene, el, i * 150));
    }
}
