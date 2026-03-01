class PipelineSection {
    constructor(scene, yOffset) {
        this.scene = scene;
        this.yOffset = yOffset;
        this.animated = false;
    }

    create() {
        const cx = WORLD_WIDTH / 2;
        const y = this.yOffset;
        const g = this.scene.add.graphics();

        g.fillStyle(COLORS.bg, 1);
        g.fillRect(0, y, WORLD_WIDTH, SECTION_HEIGHT);

        createLabel(this.scene, cx, y + 30, '02', 14, COLORS.primary);
        createTitle(this.scene, cx, y + 55, 'Indexing Pipeline', 32);
        createSubtitle(this.scene, cx, y + 100,
            'Quy tr\u00ECnh bi\u1EBFn document th\u00F4 th\u00E0nh Knowledge Graph c\u00F3 c\u1EA5u tr\u00FAc + Vector Index', 16);

        const steps = [
            { x: cx - 420, label: 'Document', desc: 'V\u0103n b\u1EA3n th\u00F4\n\u0111\u1EA7u v\u00E0o', color: COLORS.textLight },
            { x: cx - 210, label: 'Chunking', desc: 'Token-based split\noverlap windows', color: COLORS.accent },
            { x: cx, label: 'LLM Extract', desc: 'Tr\u00EDch xu\u1EA5t\nEntity & Relation', color: COLORS.secondary },
            { x: cx + 210, label: 'Dedup & Merge', desc: 'G\u1ED9p tr\u00F9ng l\u1EADp\ncanonical form', color: COLORS.success },
        ];

        const stepY = y + 220;
        const pg = this.scene.add.graphics();

        steps.forEach((step, i) => {
            drawCard(pg, step.x - 75, stepY - 40, 150, 80, 12);

            pg.fillStyle(step.color, 0.1);
            pg.fillRoundedRect(step.x - 75, stepY - 40, 150, 4, { tl: 12, tr: 12, bl: 0, br: 0 });
            pg.fillStyle(step.color, 1);
            pg.fillRoundedRect(step.x - 75, stepY - 40, 150, 4, { tl: 12, tr: 12, bl: 0, br: 0 });

            createLabel(this.scene, step.x, stepY - 12, step.label, 15, COLORS.text);
            createLabel(this.scene, step.x, stepY + 18, step.desc, 11, COLORS.textLight);

            if (i < steps.length - 1) {
                drawArrow(pg, step.x + 85, stepY, steps[i + 1].x - 85, stepY, COLORS.primary, 2);
            }
        });

        const forkY = stepY + 100;
        drawArrow(pg, cx + 210, stepY + 40, cx + 210, forkY, COLORS.primary, 2);

        const branch1X = cx - 100;
        const branch2X = cx + 100;
        const branchY = forkY + 30;

        pg.lineStyle(2, COLORS.primary, 1);
        pg.beginPath();
        pg.moveTo(cx + 210, forkY);
        pg.lineTo(branch1X, forkY);
        pg.strokePath();
        pg.beginPath();
        pg.moveTo(cx + 210, forkY);
        pg.lineTo(branch2X + 210, forkY);
        pg.strokePath();

        drawArrow(pg, branch1X, forkY, branch1X, branchY, COLORS.node, 2);
        drawArrow(pg, branch2X + 210, forkY, branch2X + 210, branchY, COLORS.nodeGreen, 2);

        drawCard(pg, branch1X - 100, branchY, 200, 120, 12);
        pg.fillStyle(COLORS.node, 1);
        pg.fillRoundedRect(branch1X - 100, branchY, 200, 4, { tl: 12, tr: 12, bl: 0, br: 0 });
        createLabel(this.scene, branch1X, branchY + 25, 'Knowledge Graph', 15, COLORS.text);
        createLabel(this.scene, branch1X, branchY + 55, 'Entities + Relations\n+ Descriptions', 12, COLORS.textLight);
        createLabel(this.scene, branch1X, branchY + 95, 'Neo4j / NetworkX', 10, COLORS.node);

        drawCard(pg, branch2X + 110, branchY, 200, 120, 12);
        pg.fillStyle(COLORS.nodeGreen, 1);
        pg.fillRoundedRect(branch2X + 110, branchY, 200, 4, { tl: 12, tr: 12, bl: 0, br: 0 });
        createLabel(this.scene, branch2X + 210, branchY + 25, 'Vector Store', 15, COLORS.text);
        createLabel(this.scene, branch2X + 210, branchY + 55, 'Chunk embeddings\n+ Entity embeddings', 12, COLORS.textLight);
        createLabel(this.scene, branch2X + 210, branchY + 95, 'Milvus / PostgreSQL', 10, COLORS.nodeGreen);

        const detailY = branchY + 160;
        const detailG = this.scene.add.graphics();

        drawCard(detailG, cx - 500, detailY, 320, 200, 12);
        detailG.fillStyle(COLORS.secondary, 1);
        detailG.fillRoundedRect(cx - 500, detailY, 320, 4, { tl: 12, tr: 12, bl: 0, br: 0 });
        createLabel(this.scene, cx - 340, detailY + 25, 'Entity Extraction', 16, COLORS.text);
        createBodyText(this.scene, cx - 340, detailY + 48,
            'LLM \u0111\u1ECDc t\u1EEBng chunk, extract:\n\n' +
            'Entities: (name, type, description)\nVD: ("Elon Musk", PERSON, "CEO...")\n\n' +
            'Relations: (src, tgt, desc, weight)\nVD: ("Elon Musk", "Tesla", "CEO of")\n\n' +
            'D\u00F9ng prompt c\u00F3 c\u1EA5u tr\u00FAc \u0111\u1EC3 LLM\ntr\u1EA3 v\u1EC1 JSON format chu\u1EA9n', 11, 280);

        drawCard(detailG, cx - 160, detailY, 320, 200, 12);
        detailG.fillStyle(COLORS.accent, 1);
        detailG.fillRoundedRect(cx - 160, detailY, 320, 4, { tl: 12, tr: 12, bl: 0, br: 0 });
        createLabel(this.scene, cx, detailY + 25, 'Deduplication', 16, COLORS.text);
        createBodyText(this.scene, cx, detailY + 48,
            'G\u1ED9p entity tr\u00F9ng l\u1EADp t\u1EEB nhi\u1EC1u chunk:\n\n' +
            '"Elon Musk" + "Musk" + "E. Musk"\n-> merge th\u00E0nh 1 canonical entity\n\n' +
            'LLM so s\u00E1nh t\u00EAn + description\n\u0111\u1EC3 x\u00E1c \u0111\u1ECBnh c\u00F3 ph\u1EA3i c\u00F9ng entity\n\n' +
            'Gi\u1EA3m k\u00EDch th\u01B0\u1EDBc graph \u0111\u00E1ng k\u1EC3\nT\u0103ng ch\u1EA5t l\u01B0\u1EE3ng retrieval', 11, 280);

        drawCard(detailG, cx + 180, detailY, 320, 200, 12);
        detailG.fillStyle(COLORS.success, 1);
        detailG.fillRoundedRect(cx + 180, detailY, 320, 4, { tl: 12, tr: 12, bl: 0, br: 0 });
        createLabel(this.scene, cx + 340, detailY + 25, 'Incremental Update', 16, COLORS.text);
        createBodyText(this.scene, cx + 340, detailY + 48,
            'Th\u00EAm t\u00E0i li\u1EC7u m\u1EDBi KH\u00D4NG c\u1EA7n rebuild:\n\n' +
            '1. Extract entities t\u1EEB doc m\u1EDBi\n' +
            '2. Match v\u1EDBi entities hi\u1EC7n c\u00F3\n' +
            '3. Merge nodes + edges m\u1EDBi\n' +
            '4. C\u1EADp nh\u1EADt vector embeddings\n\n' +
            'GraphRAG ph\u1EA3i rebuild to\u00E0n b\u1ED9\nLightRAG ch\u1EC9 O(n_new) thay v\u00EC O(N)', 11, 280);
    }
}
