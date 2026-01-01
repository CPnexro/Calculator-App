let display = document.getElementById('display');
let history = document.getElementById('history');
let currentInput = '0';
let previousInput = '';
let shouldResetDisplay = false;

// Background Canvas Animation
const bgCanvas = document.getElementById('bgCanvas');
const bgCtx = bgCanvas.getContext('2d');
bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

const bgParticles = [];
for (let i = 0; i < 50; i++) {
    bgParticles.push({
        x: Math.random() * bgCanvas.width,
        y: Math.random() * bgCanvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
    });
}

function animateBg() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    bgCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    
    bgParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > bgCanvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > bgCanvas.height) p.vy *= -1;
        
        bgCtx.beginPath();
        bgCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        bgCtx.fill();
    });
    
    requestAnimationFrame(animateBg);
}
animateBg();

// Display Canvas Animation
const particleCanvas = document.getElementById('particleCanvas');
const pCtx = particleCanvas.getContext('2d');
particleCanvas.width = particleCanvas.offsetWidth;
particleCanvas.height = particleCanvas.offsetHeight;

const particles = [];

function createParticle(x, y) {
    for (let i = 0; i < 10; i++) {
        particles.push({
            x: x,
            y: y,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            life: 1
        });
    }
}

function animateParticles() {
    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    
    particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        
        if (p.life <= 0) {
            particles.splice(index, 1);
            return;
        }
        
        pCtx.globalAlpha = p.life;
        pCtx.fillStyle = '#fff';
        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        pCtx.fill();
    });
    
    pCtx.globalAlpha = 1;
    requestAnimationFrame(animateParticles);
}
animateParticles();

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        if (currentInput === '0' && num !== '.') {
            currentInput = num;
        } else {
            currentInput += num;
        }
    }
    updateDisplay();
    createParticle(Math.random() * particleCanvas.width, Math.random() * particleCanvas.height);
}

function appendOperator(op) {
    if (shouldResetDisplay) {
        shouldResetDisplay = false;
    }
    
    const lastChar = currentInput.slice(-1);
    if ('+-×÷%'.includes(lastChar) && '+-×÷%'.includes(op)) {
        currentInput = currentInput.slice(0, -1) + op;
    } else {
        currentInput += op;
    }
    updateDisplay();
    createParticle(Math.random() * particleCanvas.width, Math.random() * particleCanvas.height);
}

function deleteLastChar() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
    createParticle(Math.random() * particleCanvas.width, Math.random() * particleCanvas.height);
}

function calculate() {
    try {
        previousInput = currentInput;
        
        // Convert display symbols to JavaScript operators
        let expression = currentInput
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-')
            .replace(/%/g, '/100');
        
        const result = eval(expression);
        
        if (!isFinite(result)) {
            throw new Error('Invalid calculation');
        }
        
        history.textContent = currentInput + ' =';
        currentInput = result.toString();
        shouldResetDisplay = true;
        updateDisplay();
        
        // Create celebration particles
        for (let i = 0; i < 30; i++) {
            createParticle(Math.random() * particleCanvas.width, Math.random() * particleCanvas.height);
        }
    } catch (e) {
        display.textContent = 'Error';
        display.classList.add('error');
        setTimeout(() => {
            display.classList.remove('error');
            currentInput = '0';
            updateDisplay();
        }, 1000);
    }
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    history.textContent = '';
    shouldResetDisplay = false;
    updateDisplay();
    
    // Create clear effect
    for (let i = 0; i < 20; i++) {
        createParticle(Math.random() * particleCanvas.width, Math.random() * particleCanvas.height);
    }
}

function updateDisplay() {
    display.textContent = currentInput;
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') {
        appendNumber(e.key);
    } else if (e.key === '+') {
        appendOperator('+');
    } else if (e.key === '-') {
        appendOperator('−');
    } else if (e.key === '*') {
        appendOperator('×');
    } else if (e.key === '/') {
        appendOperator('÷');
    } else if (e.key === '%') {
        appendOperator('%');
    } else if (e.key === '(' || e.key === ')') {
        appendOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Escape') {
        clearAll();
    } else if (e.key === 'Backspace') {
        deleteLastChar();
    }
});

// Resize handler
window.addEventListener('resize', () => {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    particleCanvas.width = particleCanvas.offsetWidth;
    particleCanvas.height = particleCanvas.offsetHeight;
});
