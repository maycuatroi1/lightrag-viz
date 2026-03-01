class ChunkingSection {
    constructor(scene, yOffset) {
        this.scene = scene;
        this.yOffset = yOffset;
    }

    create() {
        const cx = WORLD_WIDTH / 2;
        const y = this.yOffset;
        const g = this.scene.add.graphics();

        g.fillStyle(COLORS.bgAlt, 1);
        g.fillRect(0, y, WORLD_WIDTH, SECTION_HEIGHT);

        createLabel(this.scene, cx, y + 25, '06', 14, COLORS.primary);
        createTitle(this.scene, cx, y + 50, 'T\u1EEB s\u00E1ch \u0111\u1EBFn Knowledge Graph', 30);
        createSubtitle(this.scene, cx, y + 90,
            'Minh h\u1ECDa quy tr\u00ECnh th\u1EF1c t\u1EBF: cu\u1ED1n "Agile For Dummies" (130,442 k\u00FD t\u1EF1) \u0111\u01B0\u1EE3c x\u1EED l\u00FD th\u00E0nh 27 chunks, r\u1ED3i tr\u00EDch xu\u1EA5t entities v\u00E0 relations', 13);

        const phase1X = 80;
        const phase2X = 330;
        const phase3X = 630;
        const phase4X = 920;
        const rowY = y + 140;

        const pg = this.scene.add.graphics();

        pg.fillStyle(COLORS.textLight, 0.08);
        pg.fillRoundedRect(phase1X - 30, rowY, 200, 320, 10);
        pg.fillStyle(COLORS.accent, 0.08);
        pg.fillRoundedRect(phase2X - 30, rowY, 240, 320, 10);
        pg.fillStyle(COLORS.secondary, 0.08);
        pg.fillRoundedRect(phase3X - 30, rowY, 230, 320, 10);
        pg.fillStyle(COLORS.node, 0.08);
        pg.fillRoundedRect(phase4X - 30, rowY, 230, 320, 10);

        createLabel(this.scene, phase1X + 70, rowY + 18, 'B\u01B0\u1EDBc 1: T\u00E0i li\u1EC7u g\u1ED1c', 13, COLORS.textLight);
        createLabel(this.scene, phase2X + 90, rowY + 18, 'B\u01B0\u1EDBc 2: Chunking', 13, COLORS.accent);
        createLabel(this.scene, phase3X + 85, rowY + 18, 'B\u01B0\u1EDBc 3: LLM Extract', 13, COLORS.secondary);
        createLabel(this.scene, phase4X + 85, rowY + 18, 'B\u01B0\u1EDBc 4: Graph', 13, COLORS.node);

        drawCard(pg, phase1X - 15, rowY + 40, 170, 100, 8);
        this.scene.add.text(phase1X - 5, rowY + 50, 'AGILE FOR DUMMIES', {
            fontFamily: '"Be Vietnam Pro", sans-serif',
            fontSize: '11px',
            fontStyle: 'bold',
            color: hexToStr(COLORS.text),
        });
        this.scene.add.text(phase1X - 5, rowY + 68, '130,442 k\u00FD t\u1EF1\n27 chunks sau x\u1EED l\u00FD\n~4,831 k\u00FD t\u1EF1/chunk', {
            fontFamily: '"Be Vietnam Pro", sans-serif',
            fontSize: '10px',
            color: hexToStr(COLORS.textLight),
            lineSpacing: 3,
        });

        drawCard(pg, phase1X - 15, rowY + 155, 170, 130, 8);
        this.scene.add.text(phase1X - 5, rowY + 163, 'Token-based splitting:', {
            fontFamily: '"Be Vietnam Pro", sans-serif',
            fontSize: '10px',
            fontStyle: 'bold',
            color: hexToStr(COLORS.text),
        });
        this.scene.add.text(phase1X - 5, rowY + 180, 'chunk_size = 1200 tokens\noverlap = 100 tokens\n\nM\u1ED7i chunk ch\u1ED3ng l\u1EA5p 100\ntokens v\u1EDBi chunk k\u1EC1 b\u00EAn\n\u0111\u1EC3 kh\u00F4ng m\u1EA5t ng\u1EEF c\u1EA3nh\nt\u1EA1i ranh gi\u1EDBi', {
            fontFamily: '"Be Vietnam Pro", sans-serif',
            fontSize: '9px',
            color: hexToStr(COLORS.textLight),
            lineSpacing: 3,
        });

        drawArrow(pg, phase1X + 165, rowY + 90, phase2X - 20, rowY + 90, COLORS.primary, 2);

        const chunks = [
            { label: 'Chunk 1/27', text: '"Mario E. Moreira...\nImprove developer\nproductivity..."' },
            { label: 'Chunk 2/27', text: '"...Scrum is an agile\nframework. The Scrum\nMaster serves..."' },
            { label: 'Chunk 3/27', text: '"...Product Owner is\nresponsible for the\nbacklog and..."' },
            { label: '...', text: '' },
            { label: 'Chunk 27/27', text: '"...CA Agile Vision\nsupports Scrum and\nAgile workflows..."' },
        ];

        chunks.forEach((c, i) => {
            const cy = rowY + 40 + i * 56;
            drawCard(pg, phase2X - 20, cy, 220, 48, 6);
            pg.fillStyle(COLORS.accent, 1);
            pg.fillRoundedRect(phase2X - 20, cy, 4, 48, { tl: 6, tr: 0, bl: 6, br: 0 });

            this.scene.add.text(phase2X - 5, cy + 5, c.label, {
                fontFamily: '"Be Vietnam Pro", sans-serif',
                fontSize: '10px',
                fontStyle: 'bold',
                color: hexToStr(COLORS.accent),
            });
            if (c.text) {
                this.scene.add.text(phase2X - 5, cy + 18, c.text, {
                    fontFamily: '"Fira Code", monospace',
                    fontSize: '8px',
                    color: hexToStr(COLORS.textLight),
                    lineSpacing: 1,
                });
            }
        });

        drawArrow(pg, phase2X + 210, rowY + 90, phase3X - 20, rowY + 70, COLORS.primary, 2);
        drawArrow(pg, phase2X + 210, rowY + 150, phase3X - 20, rowY + 170, COLORS.primary, 2);

        createLabel(this.scene, phase3X + 85, rowY + 48, 'T\u1EEB Chunk 2:', 10, COLORS.secondary);

        const entities = [
            { label: 'Scrum', type: 'Framework', color: COLORS.nodeGreen },
            { label: 'Scrum Master', type: 'Role', color: COLORS.node },
            { label: 'Agile', type: 'Methodology', color: COLORS.accent },
        ];

        entities.forEach((e, i) => {
            const ey = rowY + 65 + i * 45;
            drawCard(pg, phase3X - 15, ey, 210, 38, 6);
            pg.fillStyle(e.color, 1);
            pg.fillRoundedRect(phase3X - 15, ey, 4, 38, { tl: 6, tr: 0, bl: 6, br: 0 });

            this.scene.add.text(phase3X - 2, ey + 5, 'Entity: ' + e.label, {
                fontFamily: '"Be Vietnam Pro", sans-serif',
                fontSize: '10px',
                fontStyle: 'bold',
                color: hexToStr(COLORS.text),
            });
            this.scene.add.text(phase3X - 2, ey + 20, 'type: ' + e.type, {
                fontFamily: '"Fira Code", monospace',
                fontSize: '8px',
                color: hexToStr(COLORS.textLight),
            });
        });

        createLabel(this.scene, phase3X + 85, rowY + 210, 'T\u1EEB Chunk 3:', 10, COLORS.secondary);

        const relations = [
            { src: 'Product Owner', tgt: 'Backlog', kw: 'responsibility' },
            { src: 'Scrum Master', tgt: 'Product Owner', kw: 'collaboration' },
        ];

        relations.forEach((r, i) => {
            const ry = rowY + 228 + i * 50;
            drawCard(pg, phase3X - 15, ry, 210, 42, 6);
            pg.fillStyle(COLORS.nodePurple, 1);
            pg.fillRoundedRect(phase3X - 15, ry, 4, 42, { tl: 6, tr: 0, bl: 6, br: 0 });

            this.scene.add.text(phase3X - 2, ry + 4, r.src + ' -> ' + r.tgt, {
                fontFamily: '"Be Vietnam Pro", sans-serif',
                fontSize: '9px',
                fontStyle: 'bold',
                color: hexToStr(COLORS.text),
            });
            this.scene.add.text(phase3X - 2, ry + 18, 'keywords: ' + r.kw, {
                fontFamily: '"Fira Code", monospace',
                fontSize: '8px',
                color: hexToStr(COLORS.textLight),
            });
        });

        drawArrow(pg, phase3X + 205, rowY + 120, phase4X - 20, rowY + 120, COLORS.primary, 2);
        drawArrow(pg, phase3X + 205, rowY + 260, phase4X - 20, rowY + 220, COLORS.primary, 2);

        const gNodes = [
            { x: phase4X + 85, y: rowY + 70, r: 20, c: COLORS.nodeGreen, label: 'Scrum' },
            { x: phase4X + 30, y: rowY + 140, r: 17, c: COLORS.node, label: 'Scrum\nMaster' },
            { x: phase4X + 150, y: rowY + 140, r: 17, c: COLORS.accent, label: 'Product\nOwner' },
            { x: phase4X + 85, y: rowY + 210, r: 15, c: COLORS.nodePurple, label: 'Backlog' },
            { x: phase4X + 170, y: rowY + 70, r: 14, c: COLORS.nodePink, label: 'Agile' },
            { x: phase4X + 10, y: rowY + 220, r: 12, c: COLORS.nodeOrange, label: 'Sprint' },
            { x: phase4X + 160, y: rowY + 240, r: 12, c: COLORS.success, label: 'Team' },
        ];

        const gEdges = [
            [0, 1], [0, 2], [0, 4], [1, 2], [1, 3], [2, 3], [1, 5], [2, 6], [0, 6],
        ];

        gEdges.forEach(([a, b]) => {
            pg.lineStyle(1.5, COLORS.primary, 0.25);
            pg.lineBetween(gNodes[a].x, gNodes[a].y, gNodes[b].x, gNodes[b].y);
        });

        gNodes.forEach(n => {
            drawNode(pg, n.x, n.y, n.r, n.c);
            createLabel(this.scene, n.x, n.y, n.label, 7, COLORS.textWhite);
        });

        const detailY = rowY + 340;
        const dg = this.scene.add.graphics();

        drawCard(dg, 50, detailY, 360, 180, 10);
        dg.fillStyle(COLORS.secondary, 1);
        dg.fillRoundedRect(50, detailY, 360, 4, { tl: 10, tr: 10, bl: 0, br: 0 });
        createLabel(this.scene, 230, detailY + 20, 'Entity Extraction Prompt (r\u00FAt g\u1ECDn)', 12, COLORS.text);
        this.scene.add.text(65, detailY + 38, 'System: "Given a text chunk, identify\nall entities and relationships.\nReturn JSON format:"\n\n{\n  "entities": [\n    {"name":"Scrum Master",\n     "type":"Role",\n     "description":"..."}\n  ],\n  "relations": [\n    {"src":"Scrum Master",\n     "tgt":"Scrum Team",\n     "desc":"leads"}\n  ]\n}', {
            fontFamily: '"Fira Code", monospace',
            fontSize: '9px',
            color: hexToStr(COLORS.textLight),
            lineSpacing: 2,
        });

        drawCard(dg, 430, detailY, 340, 180, 10);
        dg.fillStyle(COLORS.accent, 1);
        dg.fillRoundedRect(430, detailY, 340, 4, { tl: 10, tr: 10, bl: 0, br: 0 });
        createLabel(this.scene, 600, detailY + 20, 'Dedup: "Scrum Master" xu\u1EA5t hi\u1EC7n 27 l\u1EA7n', 12, COLORS.text);
        this.scene.add.text(445, detailY + 38, 'Chunk 2:  "Scrum Master serves..."\nChunk 5:  "The ScrumMaster ensures..."\nChunk 9:  "Scrum master helps..."\nChunk 14: "SM facilitates the..."\n...(27 chunks nh\u1EAFc \u0111\u1EBFn)\n\nT\u1EA5t c\u1EA3 \u0111\u01B0\u1EE3c merge th\u00E0nh 1 entity:\n  name: "Scrum Master"\n  type: "Role"\n  description: (t\u1ED5ng h\u1EE3p t\u1EEB 27 chunks)\n  source_ids: [chunk-2, chunk-5, ...]', {
            fontFamily: '"Fira Code", monospace',
            fontSize: '9px',
            color: hexToStr(COLORS.textLight),
            lineSpacing: 2,
        });

        drawCard(dg, 790, detailY, 360, 180, 10);
        dg.fillStyle(COLORS.success, 1);
        dg.fillRoundedRect(790, detailY, 360, 4, { tl: 10, tr: 10, bl: 0, br: 0 });
        createLabel(this.scene, 970, detailY + 20, 'K\u1EBFt qu\u1EA3 t\u1ED5ng h\u1EE3p t\u1EEB 4 cu\u1ED1n s\u00E1ch', 12, COLORS.text);
        this.scene.add.text(805, detailY + 38, 'Agile For Dummies:    27 chunks\nAgile Practice Guide:  63 chunks\nHead First Agile:     191 chunks\nShort Notes Agile:      2 chunks\n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nT\u1ED5ng:  283 chunks\n       1,000 entities (nodes)\n       1,899 relations (edges)\n\nTop entities: Scrum, Team, Agile,\n  Product Owner, XP, Lean, Sprint...', {
            fontFamily: '"Fira Code", monospace',
            fontSize: '9px',
            color: hexToStr(COLORS.textLight),
            lineSpacing: 2,
        });
    }
}
