class ProblemSection {
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

        createLabel(this.scene, cx, y + 30, '01', 14, COLORS.primary);
        createTitle(this.scene, cx, y + 55, 'V\u1EA5n \u0111\u1EC1 c\u1EE7a RAG truy\u1EC1n th\u1ED1ng', 32);
        createSubtitle(this.scene, cx, y + 100,
            'Naive RAG chia v\u0103n b\u1EA3n th\u00E0nh c\u00E1c chunk r\u1EDDi r\u1EA1c, embed th\u00E0nh vector r\u1ED3i l\u01B0u v\u00E0o DB.\n' +
            'Khi query, t\u00ECm top-K chunk g\u1EA7n nh\u1EA5t b\u1EB1ng cosine similarity r\u1ED3i \u0111\u01B0a v\u00E0o LLM sinh c\u00E2u tr\u1EA3 l\u1EDDi.\n' +
            'V\u1EA5n \u0111\u1EC1: m\u1EA5t ho\u00E0n to\u00E0n m\u1ED1i li\u00EAn h\u1EC7 gi\u1EEFa c\u00E1c th\u1EF1c th\u1EC3 (entity) trong c\u00E1c chunk kh\u00E1c nhau.', 14);

        const leftX = cx - 280;
        const rightX = cx + 280;

        createLabel(this.scene, leftX, y + 210, 'Naive RAG', 18, COLORS.danger);
        createLabel(this.scene, rightX, y + 210, 'LightRAG', 18, COLORS.success);

        const lg = this.scene.add.graphics();
        const chunkLabels = ['Chunk A', 'Chunk B', 'Chunk C', 'Chunk D', 'Chunk E'];

        for (let i = 0; i < 5; i++) {
            const cx2 = leftX - 80 + (i % 3) * 80;
            const cy = y + 280 + Math.floor(i / 3) * 90;
            drawCard(lg, cx2 - 55, cy - 25, 110, 50, 8);
            createLabel(this.scene, cx2, cy, chunkLabels[i], 12, COLORS.textLight);
        }

        const qMark = this.scene.add.text(leftX, y + 490, '?', {
            fontFamily: '"Be Vietnam Pro", sans-serif',
            fontSize: '48px',
            fontStyle: 'bold',
            color: hexToStr(COLORS.danger),
        }).setOrigin(0.5, 0.5);
        pulseElement(this.scene, qMark, 1.15);

        createBodyText(this.scene, leftX, y + 530,
            'M\u1ED7i chunk l\u00E0 m\u1ED9t "\u1ED1c \u0111\u1EA3o" c\u00F4 l\u1EADp\n' +
            'Kh\u00F4ng bi\u1EBFt "Elon" \u1EDF chunk A\n' +
            'v\u00E0 "Tesla" \u1EDF chunk C c\u00F3 li\u00EAn quan\n' +
            'Query multi-hop th\u1EA5t b\u1EA1i ho\u00E0n to\u00E0n\n' +
            'VD: "Elon Musk \u0111\u00E3 l\u00E0m g\u00EC v\u1EDBi Tesla?"',
            12, 250);

        const rg = this.scene.add.graphics();
        const nodes = [
            { x: rightX - 60, y: y + 280, r: 18, c: COLORS.node, label: 'Elon' },
            { x: rightX + 60, y: y + 280, r: 18, c: COLORS.nodeGreen, label: 'Tesla' },
            { x: rightX, y: y + 350, r: 18, c: COLORS.nodeOrange, label: 'SpaceX' },
            { x: rightX - 80, y: y + 400, r: 15, c: COLORS.nodePurple, label: 'AI' },
            { x: rightX + 80, y: y + 400, r: 15, c: COLORS.nodePink, label: 'Mars' },
        ];

        const edges = [[0,1],[0,2],[2,4],[0,3],[1,3],[2,3]];
        edges.forEach(([a, b]) => {
            rg.lineStyle(2, COLORS.primary, 0.3);
            rg.lineBetween(nodes[a].x, nodes[a].y, nodes[b].x, nodes[b].y);
        });
        nodes.forEach(n => {
            drawNode(rg, n.x, n.y, n.r, n.c);
            createLabel(this.scene, n.x, n.y + n.r + 14, n.label, 11, COLORS.text);
        });

        edges.forEach(([a, b], i) => {
            const midX = (nodes[a].x + nodes[b].x) / 2;
            const midY = (nodes[a].y + nodes[b].y) / 2;
            const edgeLabels = ['CEO of', 'founded', 'target', 'research', 'applied', 'develop'];
            createLabel(this.scene, midX, midY - 10, edgeLabels[i], 9, COLORS.primary);
        });

        createBodyText(this.scene, rightX, y + 480,
            'Knowledge Graph li\u00EAn k\u1EBFt entities\n' +
            'qua c\u00E1c edge c\u00F3 nh\u00E3n (labeled edges)\n' +
            'Hi\u1EC3u \u0111\u01B0\u1EE3c: Elon -> CEO of -> Tesla\n' +
            'SpaceX -> target -> Mars\n' +
            'Tr\u1EA3 l\u1EDDi multi-hop ch\u00EDnh x\u00E1c\n' +
            'nh\u1EDD graph traversal',
            12, 250);

        const divider = this.scene.add.graphics();
        divider.lineStyle(2, COLORS.line, 0.3);
        divider.lineBetween(cx, y + 200, cx, y + 700);

        const vsCircle = this.scene.add.graphics();
        vsCircle.fillStyle(COLORS.accent, 1);
        vsCircle.fillCircle(cx, y + 370, 24);
        createLabel(this.scene, cx, y + 370, 'VS', 14, COLORS.textWhite);
    }

    animate() {
        if (this.animated) return;
        this.animated = true;
    }
}
