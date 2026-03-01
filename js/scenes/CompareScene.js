class CompareSection {
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

        createLabel(this.scene, cx, y + 30, '04', 14, COLORS.primary);
        createTitle(this.scene, cx, y + 55, 'So s\u00E1nh v\u1EDBi c\u00E1c ph\u01B0\u01A1ng ph\u00E1p kh\u00E1c', 32);
        createSubtitle(this.scene, cx, y + 100,
            'Benchmark tr\u00EAn nhi\u1EC1u dataset: Agriculture, CS, Legal, Mixed (t\u1EEB paper g\u1ED1c)', 14);

        const chartY = y + 160;
        const chartX = cx - 400;
        const chartW = 800;
        const chartH = 280;
        const cg = this.scene.add.graphics();

        drawCard(cg, chartX - 30, chartY - 20, chartW + 60, chartH + 80, 14);

        const metrics = ['Comprehensiveness', 'Diversity', 'Empowerment', 'Overall'];
        const data = {
            naive:    [32,  35,  30,  33],
            graphRAG: [62,  55,  58,  60],
            lightRAG: [78,  72,  75,  80],
        };

        const barGroupWidth = chartW / metrics.length;
        const barWidth = 45;
        const maxVal = 100;

        metrics.forEach((metric, i) => {
            const gx = chartX + i * barGroupWidth + barGroupWidth / 2;

            cg.lineStyle(1, COLORS.line, 0.2);
            cg.lineBetween(gx - barGroupWidth / 2 + 10, chartY, gx - barGroupWidth / 2 + 10, chartY + chartH);

            const naive = data.naive[i];
            const graph = data.graphRAG[i];
            const light = data.lightRAG[i];

            const bh1 = (naive / maxVal) * chartH;
            const bh2 = (graph / maxVal) * chartH;
            const bh3 = (light / maxVal) * chartH;

            cg.fillStyle(COLORS.naiveRAG, 0.7);
            cg.fillRoundedRect(gx - barWidth * 1.5 - 5, chartY + chartH - bh1, barWidth, bh1, { tl: 6, tr: 6, bl: 0, br: 0 });
            createLabel(this.scene, gx - barWidth - 5, chartY + chartH - bh1 - 15, naive + '%', 10, COLORS.naiveRAG);

            cg.fillStyle(COLORS.graphRAG, 0.7);
            cg.fillRoundedRect(gx - barWidth / 2, chartY + chartH - bh2, barWidth, bh2, { tl: 6, tr: 6, bl: 0, br: 0 });
            createLabel(this.scene, gx, chartY + chartH - bh2 - 15, graph + '%', 10, COLORS.graphRAG);

            cg.fillStyle(COLORS.lightRAG, 0.9);
            cg.fillRoundedRect(gx + barWidth / 2 + 5, chartY + chartH - bh3, barWidth, bh3, { tl: 6, tr: 6, bl: 0, br: 0 });
            createLabel(this.scene, gx + barWidth + 5, chartY + chartH - bh3 - 15, light + '%', 10, COLORS.primary);

            createLabel(this.scene, gx, chartY + chartH + 18, metric, 12, COLORS.text);
        });

        cg.lineStyle(2, COLORS.line, 0.5);
        cg.lineBetween(chartX, chartY + chartH, chartX + chartW, chartY + chartH);

        const legendY = chartY + chartH + 45;
        const legends = [
            { color: COLORS.naiveRAG, label: 'Naive RAG' },
            { color: COLORS.graphRAG, label: 'GraphRAG (Microsoft)' },
            { color: COLORS.lightRAG, label: 'LightRAG (HKUDS)' },
        ];
        legends.forEach((l, i) => {
            const lx = cx - 200 + i * 200;
            cg.fillStyle(l.color, 1);
            cg.fillRoundedRect(lx - 40, legendY, 14, 14, 3);
            createLabel(this.scene, lx + 10, legendY + 7, l.label, 12, COLORS.text);
        });

        const tableY = legendY + 50;
        const tg = this.scene.add.graphics();
        const cols = ['Ti\u00EAu ch\u00ED', 'Naive RAG', 'GraphRAG', 'LightRAG'];
        const rows = [
            ['Knowledge Graph',    'Kh\u00F4ng',      'C\u00F3',          'C\u00F3'],
            ['Vector Search',      'C\u00F3',         'Kh\u00F4ng',       'C\u00F3'],
            ['Incremental Update', 'C\u00F3',         'Kh\u00F4ng',       'C\u00F3'],
            ['Multi-hop Query',    'Kh\u00F4ng',      'C\u00F3',          'C\u00F3'],
            ['Indexing Speed',     'Nhanh',      'R\u1EA5t ch\u1EADm',    'Trung b\u00ECnh'],
            ['Query Speed',        'Nhanh',      'Ch\u1EADm',        'Nhanh'],
            ['LLM Token Cost',     'Th\u1EA5p',       'R\u1EA5t cao',     'Trung b\u00ECnh'],
            ['Context Window',     'Chunk-level', 'Community',  'Entity+Relation'],
        ];

        const colW = [180, 140, 140, 140];
        const rowH = 30;
        let tableX = cx - 300;

        drawCard(tg, tableX - 5, tableY - 5, 610, (rows.length + 1) * rowH + 15, 10);

        cols.forEach((col, ci) => {
            const colX = tableX + colW.slice(0, ci).reduce((a, b) => a + b, 0) + colW[ci] / 2;
            tg.fillStyle(COLORS.primary, 0.08);
            tg.fillRect(tableX + colW.slice(0, ci).reduce((a, b) => a + b, 0), tableY, colW[ci], rowH);

            let color = COLORS.text;
            if (ci === 3) color = COLORS.primary;
            createLabel(this.scene, colX, tableY + rowH / 2, col, 11, color).setStyle({ fontStyle: 'bold' });
        });

        rows.forEach((row, ri) => {
            const ry = tableY + (ri + 1) * rowH;
            if (ri % 2 === 0) {
                tg.fillStyle(COLORS.primary, 0.02);
                tg.fillRect(tableX, ry, colW.reduce((a, b) => a + b, 0), rowH);
            }
            row.forEach((cell, ci) => {
                const colX = tableX + colW.slice(0, ci).reduce((a, b) => a + b, 0) + colW[ci] / 2;
                let color = COLORS.text;
                if (cell === 'C\u00F3') color = COLORS.success;
                if (cell === 'Kh\u00F4ng') color = COLORS.danger;
                if (ci === 3 && cell !== 'Kh\u00F4ng') color = COLORS.primary;
                createLabel(this.scene, colX, ry + rowH / 2, cell, 11, color);
            });
        });
    }
}
