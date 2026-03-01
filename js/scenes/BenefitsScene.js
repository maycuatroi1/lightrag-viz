class BenefitsSection {
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

        createLabel(this.scene, cx, y + 30, '05', 14, COLORS.primary);
        createTitle(this.scene, cx, y + 55, 'Ki\u1EBFn tr\u00FAc k\u1EF9 thu\u1EADt chi ti\u1EBFt', 32);
        createSubtitle(this.scene, cx, y + 100,
            'C\u00E1c th\u00E0nh ph\u1EA7n c\u1ED1t l\u00F5i v\u00E0 c\u00E1ch ch\u00FAng t\u01B0\u01A1ng t\u00E1c v\u1EDBi nhau trong LightRAG', 16);

        const benefits = [
            {
                title: 'Token Budget Control',
                desc: 'QueryParam cho ph\u00E9p gi\u1EDBi h\u1EA1n s\u1ED1 token cho entities, relations, v\u00E0 chunks ri\u00EAng bi\u1EC7t. Tr\u00E1nh context overflow khi graph l\u1EDBn. M\u1ED7i th\u00E0nh ph\u1EA7n c\u00F3 budget \u0111\u1ED9c l\u1EADp, \u01B0u ti\u00EAn theo relevance score.',
                color: COLORS.accent,
            },
            {
                title: 'Graph Storage Layer',
                desc: 'H\u1ED7 tr\u1EE3 nhi\u1EC1u backend: Neo4j (production), NetworkX (local). M\u1ED7i entity l\u00E0 1 node v\u1EDBi attributes: name, type, description, source_chunk_ids. M\u1ED7i relation l\u00E0 1 edge v\u1EDBi weight v\u00E0 description.',
                color: COLORS.node,
            },
            {
                title: 'Embedding Pipeline',
                desc: 'Entity descriptions v\u00E0 chunk text \u0111\u01B0\u1EE3c embed ri\u00EAng. D\u00F9ng c\u00F9ng embedding model (vd: bge-m3, text-embedding-3-large). Khi \u0111\u1ED5i model ph\u1EA3i recreate vector table. Cache embedding \u0111\u1EC3 t\u0103ng t\u1ED1c.',
                color: COLORS.success,
            },
            {
                title: 'LLM Requirements',
                desc: 'Extraction c\u1EA7n model m\u1EA1nh: >= 32B params, context >= 32K tokens (khuy\u1EBFn ngh\u1ECB 64K). C\u00F3 th\u1EC3 d\u00F9ng model kh\u00E1c nhau cho indexing (nhanh) v\u00E0 querying (ch\u00EDnh x\u00E1c). H\u1ED7 tr\u1EE3 OpenAI, Ollama, Azure, Gemini.',
                color: COLORS.secondary,
            },
            {
                title: 'Keyword Extraction',
                desc: 'Khi query, LLM tr\u00EDch xu\u1EA5t 2 lo\u1EA1i keywords: entity keywords (t\u00EAn th\u1EF1c th\u1EC3 c\u1EE5 th\u1EC3) v\u00E0 relation keywords (lo\u1EA1i quan h\u1EC7). Hai lo\u1EA1i n\u00E0y t\u01B0\u01A1ng \u1EE9ng v\u1EDBi Local v\u00E0 Global retrieval mode.',
                color: COLORS.nodePurple,
            },
            {
                title: 'Reranker Integration',
                desc: 'H\u1ED7 tr\u1EE3 reranking model (vd: bge-reranker) \u0111\u1EC3 tinh ch\u1EC9nh k\u1EBFt qu\u1EA3 retrieval. \u0110\u1EB7c bi\u1EC7t h\u1EEFu \u00EDch cho Mix mode khi k\u1EBFt h\u1EE3p KG + vector results. Reranker s\u1EAFp x\u1EBFp l\u1EA1i theo relevance th\u1EF1c t\u1EBF.',
                color: COLORS.nodePink,
            },
        ];

        const cardW = 340;
        const cardH = 155;
        const gap = 30;
        const cols = 3;
        const startX = cx - (cols * cardW + (cols - 1) * gap) / 2;
        const startY = y + 155;
        const bg = this.scene.add.graphics();

        benefits.forEach((b, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const bx = startX + col * (cardW + gap);
            const by = startY + row * (cardH + gap);

            drawCard(bg, bx, by, cardW, cardH, 14);

            bg.fillStyle(b.color, 1);
            bg.fillRoundedRect(bx, by, 5, cardH, { tl: 14, tr: 0, bl: 14, br: 0 });

            this.scene.add.text(bx + 20, by + 18, b.title, {
                fontFamily: '"Be Vietnam Pro", sans-serif',
                fontSize: '15px',
                fontStyle: 'bold',
                color: hexToStr(COLORS.text),
            });

            this.scene.add.text(bx + 20, by + 42, b.desc, {
                fontFamily: '"Be Vietnam Pro", sans-serif',
                fontSize: '11px',
                color: hexToStr(COLORS.textLight),
                wordWrap: { width: cardW - 35 },
                lineSpacing: 4,
            });
        });

        const archY = startY + 2 * (cardH + gap) + 30;
        const ag = this.scene.add.graphics();

        drawCard(ag, cx - 480, archY, 960, 200, 14);
        ag.fillStyle(COLORS.primary, 0.03);
        ag.fillRoundedRect(cx - 480, archY, 960, 200, 14);

        createLabel(this.scene, cx, archY + 20, 'Architecture Overview', 16, COLORS.text);

        const layers = [
            { x: cx - 350, w: 160, label: 'Document\nStore', sub: 'KV Storage\nchunk tracking', color: COLORS.textLight },
            { x: cx - 170, w: 160, label: 'LLM\nService', sub: 'extract / query\nasync batching', color: COLORS.secondary },
            { x: cx + 10, w: 160, label: 'Knowledge\nGraph', sub: 'entity + relation\ngraph operations', color: COLORS.node },
            { x: cx + 190, w: 160, label: 'Vector\nStore', sub: 'embeddings\nANN search', color: COLORS.nodeGreen },
            { x: cx + 370, w: 160, label: 'Query\nEngine', sub: 'dual retrieval\ntoken budget', color: COLORS.accent },
        ];

        layers.forEach((l, i) => {
            ag.fillStyle(l.color, 0.1);
            ag.fillRoundedRect(l.x - l.w / 2, archY + 50, l.w, 100, 10);
            ag.lineStyle(1, l.color, 0.4);
            ag.strokeRoundedRect(l.x - l.w / 2, archY + 50, l.w, 100, 10);

            createLabel(this.scene, l.x, archY + 80, l.label, 12, COLORS.text);
            createLabel(this.scene, l.x, archY + 120, l.sub, 9, COLORS.textLight);

            if (i < layers.length - 1) {
                drawArrow(ag, l.x + l.w / 2 + 2, archY + 100, layers[i + 1].x - layers[i + 1].w / 2 - 2, archY + 100, COLORS.line, 1);
            }
        });

    }
}
