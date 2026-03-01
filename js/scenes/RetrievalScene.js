class RetrievalSection {
    constructor(scene, yOffset) {
        this.scene = scene;
        this.yOffset = yOffset;
        this.animated = false;
    }

    create() {
        const cx = WORLD_WIDTH / 2;
        const y = this.yOffset;
        const g = this.scene.add.graphics();

        g.fillStyle(COLORS.bgAlt, 1);
        g.fillRect(0, y, WORLD_WIDTH, SECTION_HEIGHT);

        createLabel(this.scene, cx, y + 30, '03', 14, COLORS.primary);
        createTitle(this.scene, cx, y + 55, 'Dual-Level Retrieval', 32);
        createSubtitle(this.scene, cx, y + 100,
            'Khi nh\u1EADn query, LLM extract keywords r\u1ED3i th\u1EF1c hi\u1EC7n 2 lu\u1ED3ng truy xu\u1EA5t song song.\n' +
            'K\u1EBFt qu\u1EA3 \u0111\u01B0\u1EE3c merge v\u00E0 \u0111\u01B0a v\u00E0o LLM \u0111\u1EC3 sinh c\u00E2u tr\u1EA3 l\u1EDDi cu\u1ED1i c\u00F9ng.', 14);

        const modes = [
            {
                x: cx - 350, label: 'Local Retrieval',
                desc: 'Truy xu\u1EA5t c\u1EA5p \u0111\u1ED9 th\u1EF1c th\u1EC3',
                detail: 'Query -> extract entity keywords\n-> t\u00ECm entity trong KG\n-> l\u1EA5y c\u00E1c node l\u00E2n c\u1EADn (1-hop)\n-> l\u1EA5y descriptions c\u1EE7a ch\u00FAng\n\nPh\u00F9 h\u1EE3p c\u00E2u h\u1ECFi c\u1EE5 th\u1EC3:\n"Tesla \u0111\u01B0\u1EE3c th\u00E0nh l\u1EADp n\u0103m n\u00E0o?"\n"Ai l\u00E0 CEO c\u1EE7a SpaceX?"',
                color: COLORS.node,
                example: 'Entity-centric search',
            },
            {
                x: cx, label: 'Global Retrieval',
                desc: 'Truy xu\u1EA5t c\u1EA5p \u0111\u1ED9 quan h\u1EC7',
                detail: 'Query -> extract relation keywords\n-> t\u00ECm relationships trong KG\n-> t\u1ED5ng h\u1EE3p nhi\u1EC1u quan h\u1EC7\n-> x\u00E2y d\u1EF1ng context r\u1ED9ng\n\nPh\u00F9 h\u1EE3p c\u00E2u h\u1ECFi tr\u1EEBu t\u01B0\u1EE3ng:\n"T\u1EA7m nh\u00ECn c\u1EE7a Elon Musk\nv\u1EC1 n\u0103ng l\u01B0\u1EE3ng s\u1EA1ch l\u00E0 g\u00EC?"',
                color: COLORS.secondary,
                example: 'Relationship-centric search',
            },
            {
                x: cx + 350, label: 'Hybrid / Mix',
                desc: 'K\u1EBFt h\u1EE3p c\u1EA3 hai + Vector',
                detail: 'Local + Global ch\u1EA1y song song\n-> merge k\u1EBFt qu\u1EA3 (union)\n\nMix mode th\u00EAm c\u1EA3 vector search:\nKG retrieval + cosine similarity\n-> re-rank theo relevance score\n\nTo\u00E0n di\u1EC7n nh\u1EA5t, ph\u00F9 h\u1EE3p\nm\u1ECDi lo\u1EA1i c\u00E2u h\u1ECFi',
                color: COLORS.accent,
                example: 'KG + Vector combined',
            },
        ];

        const cardY = y + 175;
        const mg = this.scene.add.graphics();

        modes.forEach((mode, i) => {
            drawCard(mg, mode.x - 140, cardY, 280, 340, 14);
            mg.fillStyle(mode.color, 1);
            mg.fillRoundedRect(mode.x - 140, cardY, 280, 5, { tl: 14, tr: 14, bl: 0, br: 0 });

            createLabel(this.scene, mode.x, cardY + 35, mode.label, 18, COLORS.text);
            createLabel(this.scene, mode.x, cardY + 65, mode.desc, 13, COLORS.textLight);

            mg.lineStyle(1, COLORS.line, 0.3);
            mg.lineBetween(mode.x - 110, cardY + 85, mode.x + 110, cardY + 85);

            createBodyText(this.scene, mode.x, cardY + 95, mode.detail, 11, 240);

            mg.fillStyle(mode.color, 0.08);
            mg.fillRoundedRect(mode.x - 110, cardY + 275, 220, 35, 8);
            createLabel(this.scene, mode.x, cardY + 293, mode.example, 11, mode.color);

            if (i === 2) {
                mg.lineStyle(2, COLORS.accent, 0.8);
                mg.strokeRoundedRect(mode.x - 140, cardY, 280, 340, 14);
                this.scene.add.text(mode.x + 100, cardY - 12, 'Best', {
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                    fontSize: '10px',
                    fontStyle: 'bold',
                    color: hexToStr(COLORS.textWhite),
                    backgroundColor: hexToStr(COLORS.accent),
                    padding: { x: 8, y: 4 },
                }).setOrigin(0.5, 0.5);
            }
        });

        const flowY = cardY + 365;
        const fg = this.scene.add.graphics();

        drawCard(fg, cx - 480, flowY, 960, 140, 12);
        fg.fillStyle(COLORS.primary, 0.05);
        fg.fillRoundedRect(cx - 480, flowY, 960, 140, 12);

        createLabel(this.scene, cx, flowY + 15, 'Query Processing Pipeline', 16, COLORS.text);

        const flowSteps = [
            { x: cx - 380, label: 'User\nQuery', sub: 'raw text' },
            { x: cx - 220, label: 'LLM Extract\nKeywords', sub: 'entity + relation' },
            { x: cx - 50, label: 'Graph\nTraversal', sub: 'BFS / neighbor' },
            { x: cx + 120, label: 'Vector\nSearch', sub: 'cosine sim' },
            { x: cx + 280, label: 'Merge &\nRe-rank', sub: 'token budget' },
            { x: cx + 430, label: 'LLM\nGenerate', sub: 'final answer' },
        ];

        flowSteps.forEach((step, i) => {
            fg.fillStyle(COLORS.primary, 0.1);
            fg.fillCircle(step.x, flowY + 60, 20);
            createLabel(this.scene, step.x, flowY + 60, String(i + 1), 13, COLORS.primary);
            createLabel(this.scene, step.x, flowY + 90, step.label, 10, COLORS.text);
            createLabel(this.scene, step.x, flowY + 118, step.sub, 9, COLORS.textLight);

            if (i < flowSteps.length - 1) {
                drawArrow(fg, step.x + 26, flowY + 60, flowSteps[i + 1].x - 26, flowY + 60, COLORS.primary, 1.5);
            }
        });
    }
}
