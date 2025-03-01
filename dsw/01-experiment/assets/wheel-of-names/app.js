const names = [
    "Ayşe Pınar Yazıcıoğlu",
    "Lilith Fock",
    "Mateo Moreno Zapata",
    "Shen, Wenhui",
    "Tijmen Heuvelman",
    "Xiaowen Song",
    "Yue Li",
    "Aldo Matraku",
    "Alice Correia",
    "Amaludin Ibnu Prady",
    "Arda Köşker",
    "Areeba Ahmed",
    "Balint Furmann",
    "Dian Saskia Bani",
    "Misja Mikkers",
    "Nese",
    "Oumar Fatime",
    "Rushat Gabhane",
    "Rusheel Mehra",
    "Yajie Fu",
    "Yaxing Li",
    "Zhenkai Yang",
    "Maria Coman",
    "Paula Autmaring Aullana",
    "Temi Salami",
    "Karel Kroeze",
    "Tomas Härkönen",
    "Tuomas Nummela",
]

function createWheelOfFortune(containerId, options) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id "${containerId}" not found.`);
        return;
    }

    const canvas = document.createElement('canvas');
    canvas.id = 'wheel';
    canvas.width = 800;
    canvas.height = 800;
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const numOptions = options.length;
    const arcSize = (2 * Math.PI) / numOptions;
    const radius = (canvas.width / 2);

    options.forEach((option, index) => {
        const angle = index * arcSize;
        ctx.beginPath();
        ctx.arc(radius, radius, radius, angle, angle + arcSize);
        ctx.lineTo(radius, radius);
        const hue = ((index * 315 * 7) / numOptions) % 360;
        ctx.fillStyle = `hsl(${hue}, 80%, 40%)`;
        ctx.fill();

        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(angle + arcSize / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 24px Linotype Univers Thin, Arial Narrow, Arial, sans-serif';
        ctx.fillText(option, radius -10, 10);
        ctx.restore();
    });

    return canvas;
}

function createOverlayMarker(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id "${containerId}" not found.`);
        return;
    }

    const overlayCanvas = document.createElement('canvas');
    overlayCanvas.id = 'overlay';
    overlayCanvas.width = 800;
    overlayCanvas.height = 800;
    container.appendChild(overlayCanvas);
    container.style.position = 'relative';
    overlayCanvas.style.position = 'absolute';
    overlayCanvas.style.top = '0';
    overlayCanvas.style.left = '0';

    const ctx = overlayCanvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(380, 0);
    ctx.lineTo(400, 40);
    ctx.lineTo(420, 0);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.fill();
}

/**
 * Calculates the y coordinate of a cubic Bezier curve at a given t parameter.
 *
 * @param {number} p0 - The first control point.
 * @param {number} p1 - The second control point.
 * @param {number} p2 - The third control point.
 * @param {number} p3 - The fourth control point.
 * @param {number} t - The parameter t, ranging from 0 to 1.
 * @returns {number} The y coordinate at the given t parameter.
 */
function cubicBezier(p0, p1, p2, p3, t) {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;

    const p = uuu * p0; // u^3 * p0
    const q = 3 * uu * t * p1; // 3 * u^2 * t * p1
    const r = 3 * u * tt * p2; // 3 * u * t^2 * p2
    const s = ttt * p3; // t^3 * p3

    return p + q + r + s;
}

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

class Sound {
    constructor(audioContext, url) {
        this.audioContext = audioContext;
        this.url = url;
        this.buffer = null;
    }

    load() {
        return fetch(this.url)
            .then(response => response.arrayBuffer())
            .then(data => this.audioContext.decodeAudioData(data))
            .then(buffer => {
                this.buffer = buffer;
            })
            .catch(error => console.error('Error loading sound:', error));
    }

    play(volume = 1.0) {
        if (!this.buffer) {
            console.error('Sound buffer is not loaded.');
            return;
        }
        const source = this.audioContext.createBufferSource();
        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = volume;
        source.buffer = this.buffer;
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        source.start(0);
        source.onended = () => {
            source.disconnect();
            gainNode.disconnect();
        };
    }
    play() {
        if (!this.buffer) {
            console.error('Sound buffer is not loaded.');
            return;
        }
        const source = this.audioContext.createBufferSource();
        source.buffer = this.buffer;
        source.connect(this.audioContext.destination);
        source.start(0);
        source.onended = () => {
            source.disconnect();
        };
    }
}

const tickSound = new Sound(audioContext, 'click.wav');
const tadaSound = new Sound(audioContext, "tadaa.wav");
tadaSound.load();
tickSound.load();

function spinWheel(canvas, options, fix) {
    const duration = 30;
    let tickInterval = 360 / options.length;

    let spins = Math.random() * 360 + 360 * 3; // Random spins between 5 and 6 full rotations
    if (fix) {
        console.log("fixing for", fix, "at index", options.indexOf(fix));
        spins = spins - (spins % 360) + (options.indexOf(fix) - 1) * tickInterval - tickInterval * Math.random();
    }

    let tf = canvas.style.transform;
    let currentRotation = 0;
    if (tf) {
        currentRotation = parseFloat(canvas.style.transform.split("(")[1].split(")")[0]) % tickInterval;
    }
    console.log(currentRotation);

    canvas.style.transition = `transform ${duration}s cubic-bezier(0.33, 1, 0.68, 1)`;
    canvas.style.transform = `rotate(${spins}deg)`;

    let time = 0;
    let lastPos = 0;
    let interval = 25;

    const tickIntervalId = setInterval(() => {
        time += interval / (duration * 1000);
        // note that the (0,0) and (1,1) points are normally implied, while 
        // we also only care about the y coordinate here. 
        // the css points are thus (0,0), (0.33, 1), (0.68,1), (1,1), 
        // taking only the y coordinates we get 0,1,1,1
        let y = cubicBezier(0, 1, 1, 1, time);
        let pos = y * spins;
        if (pos >= lastPos + tickInterval) {
            lastPos = pos;
            tickSound.play(0.5 + 0.5 * time);
        }
    }, interval);

    setTimeout(() => {
        clearInterval(tickIntervalId);
    }, duration * 1000);

    setTimeout(() => {
        canvas.style.transition = '';
        canvas.style.transform = `rotate(${spins % 360}deg)`;
        tadaSound.play(0.8);
    }, duration * 1000);
}