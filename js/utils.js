const COLORS = {
    bg: 0xF8F9FA,
    bgAlt: 0xFFFFFF,
    primary: 0x4A90D9,
    primaryDark: 0x2C5F8A,
    secondary: 0x7C3AED,
    accent: 0xF59E0B,
    success: 0x10B981,
    danger: 0xEF4444,
    text: 0x1F2937,
    textLight: 0x6B7280,
    textWhite: 0xFFFFFF,
    line: 0xD1D5DB,
    node: 0x3B82F6,
    nodeGreen: 0x10B981,
    nodeOrange: 0xF59E0B,
    nodePurple: 0x8B5CF6,
    nodePink: 0xEC4899,
    cardBg: 0xFFFFFF,
    cardShadow: 0x00000033,
    graphRAG: 0xF97316,
    naiveRAG: 0x94A3B8,
    lightRAG: 0x4A90D9,
};

const SECTION_HEIGHT = 800;
const WORLD_WIDTH = 1200;
const TOTAL_SECTIONS = 8;
const WORLD_HEIGHT = SECTION_HEIGHT * TOTAL_SECTIONS;

function hexToStr(hex) {
    return '#' + hex.toString(16).padStart(6, '0');
}

function sectionY(index) {
    return index * SECTION_HEIGHT;
}

function drawRoundedRect(graphics, x, y, w, h, radius, fillColor, alpha = 1) {
    graphics.fillStyle(fillColor, alpha);
    graphics.fillRoundedRect(x, y, w, h, radius);
}

function drawCard(graphics, x, y, w, h, radius = 16) {
    graphics.fillStyle(0x000000, 0.06);
    graphics.fillRoundedRect(x + 3, y + 3, w, h, radius);
    graphics.fillStyle(COLORS.cardBg, 1);
    graphics.fillRoundedRect(x, y, w, h, radius);
    graphics.lineStyle(1, COLORS.line, 0.5);
    graphics.strokeRoundedRect(x, y, w, h, radius);
}

function createTitle(scene, x, y, text, size = 36) {
    return scene.add.text(x, y, text, {
        fontFamily: '"Be Vietnam Pro", "Segoe UI", sans-serif',
        fontSize: size + 'px',
        fontStyle: 'bold',
        color: hexToStr(COLORS.text),
        align: 'center',
    }).setOrigin(0.5, 0);
}

function createSubtitle(scene, x, y, text, size = 18) {
    return scene.add.text(x, y, text, {
        fontFamily: '"Be Vietnam Pro", "Segoe UI", sans-serif',
        fontSize: size + 'px',
        color: hexToStr(COLORS.textLight),
        align: 'center',
        wordWrap: { width: 900 },
        lineSpacing: 6,
    }).setOrigin(0.5, 0);
}

function createLabel(scene, x, y, text, size = 14, color = COLORS.text) {
    return scene.add.text(x, y, text, {
        fontFamily: '"Be Vietnam Pro", "Segoe UI", sans-serif',
        fontSize: size + 'px',
        color: hexToStr(color),
        align: 'center',
    }).setOrigin(0.5, 0.5);
}

function createBodyText(scene, x, y, text, size = 15, maxWidth = 500) {
    return scene.add.text(x, y, text, {
        fontFamily: '"Be Vietnam Pro", "Segoe UI", sans-serif',
        fontSize: size + 'px',
        color: hexToStr(COLORS.text),
        wordWrap: { width: maxWidth },
        lineSpacing: 6,
    }).setOrigin(0.5, 0);
}

function drawArrow(graphics, fromX, fromY, toX, toY, color = COLORS.primary, thickness = 2) {
    graphics.lineStyle(thickness, color, 1);
    graphics.beginPath();
    graphics.moveTo(fromX, fromY);
    graphics.lineTo(toX, toY);
    graphics.strokePath();

    const angle = Math.atan2(toY - fromY, toX - fromX);
    const arrowSize = 10;
    graphics.fillStyle(color, 1);
    graphics.fillTriangle(
        toX, toY,
        toX - arrowSize * Math.cos(angle - Math.PI / 6), toY - arrowSize * Math.sin(angle - Math.PI / 6),
        toX - arrowSize * Math.cos(angle + Math.PI / 6), toY - arrowSize * Math.sin(angle + Math.PI / 6)
    );
}

function drawNode(graphics, x, y, radius, color) {
    graphics.fillStyle(0x000000, 0.08);
    graphics.fillCircle(x + 2, y + 2, radius);
    graphics.fillStyle(color, 1);
    graphics.fillCircle(x, y, radius);
    graphics.lineStyle(2, 0xFFFFFF, 0.6);
    graphics.strokeCircle(x, y, radius);
}

function fadeInElement(scene, element, delay = 0, duration = 600) {
    element.setAlpha(0);
    scene.tweens.add({
        targets: element,
        alpha: 1,
        duration: duration,
        delay: delay,
        ease: 'Power2',
    });
}

function slideInFromLeft(scene, element, delay = 0) {
    const origX = element.x;
    element.setAlpha(0);
    element.x -= 80;
    scene.tweens.add({
        targets: element,
        x: origX,
        alpha: 1,
        duration: 700,
        delay: delay,
        ease: 'Back.easeOut',
    });
}

function slideInFromRight(scene, element, delay = 0) {
    const origX = element.x;
    element.setAlpha(0);
    element.x += 80;
    scene.tweens.add({
        targets: element,
        x: origX,
        alpha: 1,
        duration: 700,
        delay: delay,
        ease: 'Back.easeOut',
    });
}

function slideInFromBottom(scene, element, delay = 0) {
    const origY = element.y;
    element.setAlpha(0);
    element.y += 60;
    scene.tweens.add({
        targets: element,
        y: origY,
        alpha: 1,
        duration: 700,
        delay: delay,
        ease: 'Back.easeOut',
    });
}

function pulseElement(scene, element, scale = 1.05) {
    scene.tweens.add({
        targets: element,
        scaleX: scale,
        scaleY: scale,
        duration: 1200,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
    });
}
