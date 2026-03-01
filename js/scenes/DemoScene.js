class DemoSection {
    constructor(scene, yOffset) {
        this.scene = scene;
        this.yOffset = yOffset;
    }

    create() {
        const cx = WORLD_WIDTH / 2;
        const y = this.yOffset;
        const g = this.scene.add.graphics();

        g.fillStyle(COLORS.bg, 1);
        g.fillRect(0, y, WORLD_WIDTH, SECTION_HEIGHT);

        createLabel(this.scene, cx, y + 30, '07', 14, COLORS.primary);
        createTitle(this.scene, cx, y + 55, 'Demo th\u1EF1c t\u1EBF: FSB Agile Knowledge Base', 30);
        createSubtitle(this.scene, cx, y + 100,
            'D\u1EEF li\u1EC7u th\u1EF1c t\u1EBF t\u1EEB 4 cu\u1ED1n s\u00E1ch Agile/Scrum, 283 chunks, 1000 nodes, 1899 edges\n' +
            'LLM: Gemini 2.0 Flash  |  Embedding: gemini-embedding-001  |  Graph: Neo4j  |  Vector: NanoVectorDB', 13);

        const statsY = y + 160;
        const sg = this.scene.add.graphics();
        const stats = [
            { label: 'Documents', value: '4', sub: 'PDF files', color: COLORS.primary },
            { label: 'Chunks', value: '283', sub: 'text segments', color: COLORS.accent },
            { label: 'Entities', value: '1,000', sub: 'graph nodes', color: COLORS.node },
            { label: 'Relations', value: '1,899', sub: 'graph edges', color: COLORS.secondary },
        ];

        stats.forEach((s, i) => {
            const sx = cx - 375 + i * 250;
            drawCard(sg, sx - 95, statsY, 190, 70, 10);
            sg.fillStyle(s.color, 1);
            sg.fillRoundedRect(sx - 95, statsY, 190, 4, { tl: 10, tr: 10, bl: 0, br: 0 });
            createLabel(this.scene, sx, statsY + 25, s.value, 22, s.color);
            createLabel(this.scene, sx, statsY + 50, s.label + ' (' + s.sub + ')', 10, COLORS.textLight);
        });

        const graphY = statsY + 100;
        const gg = this.scene.add.graphics();
        drawCard(gg, cx - 500, graphY, 500, 340, 12);
        gg.fillStyle(COLORS.node, 1);
        gg.fillRoundedRect(cx - 500, graphY, 500, 4, { tl: 12, tr: 12, bl: 0, br: 0 });
        createLabel(this.scene, cx - 250, graphY + 22, 'Scrum Master Subgraph (th\u1EF1c t\u1EBF)', 14, COLORS.text);

        const gNodes = [
            { x: cx - 250, y: graphY + 120, r: 28, c: COLORS.node, label: 'Scrum Master' },
            { x: cx - 400, y: graphY + 80, r: 18, c: COLORS.nodeGreen, label: 'Product Owner' },
            { x: cx - 400, y: graphY + 180, r: 16, c: COLORS.nodeOrange, label: 'Daily Scrum' },
            { x: cx - 120, y: graphY + 70, r: 16, c: COLORS.nodePurple, label: 'Scrum Team' },
            { x: cx - 100, y: graphY + 170, r: 15, c: COLORS.nodePink, label: 'Dev Team' },
            { x: cx - 350, y: graphY + 260, r: 14, c: COLORS.accent, label: 'Sprint Review' },
            { x: cx - 180, y: graphY + 260, r: 14, c: COLORS.success, label: 'Servant Leader' },
            { x: cx - 280, y: graphY + 280, r: 12, c: COLORS.primary, label: 'Sprint Planning' },
        ];

        const gEdges = [
            [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
            [1, 3], [2, 4], [5, 3],
        ];

        gEdges.forEach(([a, b]) => {
            gg.lineStyle(1.5, COLORS.primary, 0.25);
            gg.lineBetween(gNodes[a].x, gNodes[a].y, gNodes[b].x, gNodes[b].y);
        });

        gNodes.forEach(n => {
            drawNode(gg, n.x, n.y, n.r, n.c);
            createLabel(this.scene, n.x, n.y + n.r + 12, n.label, 9, COLORS.text);
        });

        const edgeLabels = [
            { a: 0, b: 1, text: 'gi\u1EA3i quy\u1EBFt xung \u0111\u1ED9t' },
            { a: 0, b: 2, text: 'tham gia' },
            { a: 0, b: 4, text: 'h\u01B0\u1EDBng d\u1EABn' },
            { a: 0, b: 6, text: 'l\u00E0 vai tr\u00F2' },
        ];
        edgeLabels.forEach(e => {
            const mx = (gNodes[e.a].x + gNodes[e.b].x) / 2;
            const my = (gNodes[e.a].y + gNodes[e.b].y) / 2;
            createLabel(this.scene, mx, my - 8, e.text, 8, COLORS.primary);
        });

        drawCard(gg, cx + 20, graphY, 480, 340, 12);
        gg.fillStyle(COLORS.secondary, 1);
        gg.fillRoundedRect(cx + 20, graphY, 480, 4, { tl: 12, tr: 12, bl: 0, br: 0 });
        createLabel(this.scene, cx + 260, graphY + 22, 'Query Walkthrough: Hybrid Mode', 14, COLORS.text);

        const qx = cx + 60;
        const qSteps = [
            { y: graphY + 50, label: 'Query:', text: '"Scrum Master v\u00E0 Product Owner\nli\u00EAn quan nh\u01B0 th\u1EBF n\u00E0o?"', color: COLORS.text },
            { y: graphY + 100, label: 'B1. Extract keywords:', text: 'Entity: [Scrum Master, Product Owner]\nRelation: [gi\u1EA3i quy\u1EBFt, h\u1ED7 tr\u1EE3, backlog]', color: COLORS.accent },
            { y: graphY + 155, label: 'B2. Local (entity-centric):', text: 'T\u00ECm node "Scrum Master" -> 1-hop neighbors\n-> Product Owner, Scrum Team, Daily Scrum...', color: COLORS.node },
            { y: graphY + 210, label: 'B3. Global (relation-centric):', text: 'T\u00ECm edges ch\u1EE9a "gi\u1EA3i quy\u1EBFt", "h\u1ED7 tr\u1EE3"\n-> SM gi\u1EA3i quy\u1EBFt xung \u0111\u1ED9t v\u1EDBi PO', color: COLORS.secondary },
            { y: graphY + 265, label: 'B4. Merge + Generate:', text: 'K\u1EBFt h\u1EE3p context t\u1EEB c\u1EA3 2 lu\u1ED3ng\n-> LLM sinh c\u00E2u tr\u1EA3 l\u1EDDi v\u1EDBi references', color: COLORS.success },
        ];

        qSteps.forEach((s, i) => {
            this.scene.add.text(qx, s.y, s.label, {
                fontFamily: '"Be Vietnam Pro", sans-serif',
                fontSize: '11px',
                fontStyle: 'bold',
                color: hexToStr(s.color),
            });
            this.scene.add.text(qx, s.y + 15, s.text, {
                fontFamily: '"Be Vietnam Pro", sans-serif',
                fontSize: '10px',
                color: hexToStr(COLORS.textLight),
                lineSpacing: 3,
            });
            if (i < qSteps.length - 1) {
                gg.fillStyle(COLORS.line, 0.4);
                gg.fillTriangle(qx + 8, s.y + 42, qx + 4, s.y + 38, qx + 12, s.y + 38);
            }
        });

        const ansY = graphY + 350;
        const ag = this.scene.add.graphics();
        drawCard(ag, cx - 500, ansY, 1000, 90, 12);
        ag.fillStyle(COLORS.success, 0.05);
        ag.fillRoundedRect(cx - 500, ansY, 1000, 90, 12);
        ag.lineStyle(1, COLORS.success, 0.3);
        ag.strokeRoundedRect(cx - 500, ansY, 1000, 90, 12);

        createLabel(this.scene, cx - 460, ansY + 15, 'K\u1EBFt qu\u1EA3 th\u1EF1c t\u1EBF t\u1EEB API:', 12, COLORS.success).setOrigin(0, 0.5);
        this.scene.add.text(cx - 460, ansY + 30, '"The ScrumMaster needs to ensure the Product Owner is up-to-speed on their particular specialty.\nAlso, the Scrum Master helps the Product Owner find effective ways to manage the backlog."\nRef: AGILE FOR DUMMIES - eBOOK.pdf, Head First Agile - A Brain-Friendly Guide to Agile and the PMI-ACP Certification.pdf', {
            fontFamily: '"Fira Code", monospace',
            fontSize: '10px',
            color: hexToStr(COLORS.text),
            wordWrap: { width: 950 },
            lineSpacing: 3,
        });
    }
}
