// Create hour markers
function createHourMarkers() {
    const hourMarkers = document.getElementById('hourMarkers');
    for (let i = 0; i < 12; i++) {
        const marker = document.createElement('div');
        marker.className = 'hour-marker';
        marker.style.transform = `rotate(${i * 30}deg)`;
        hourMarkers.appendChild(marker);
    }
}

// Create minute markers
function createMinuteMarkers() {
    const minuteMarkers = document.getElementById('minuteMarkers');
    for (let i = 0; i < 60; i++) {
        if (i % 5 !== 0) { // Skip positions where hour markers are
            const marker = document.createElement('div');
            marker.className = 'minute-marker';
            marker.style.transform = `rotate(${i * 6}deg)`;
            minuteMarkers.appendChild(marker);
        }
    }
}

// Create numbers
function createNumbers() {
    const numbersContainer = document.getElementById('numbers');
    const numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    
    numbers.forEach((num, index) => {
        const numberElement = document.createElement('div');
        numberElement.className = 'number';
        numberElement.textContent = num;
        
        const angle = (index * 30) - 90; // Start from 12 o'clock
        const radian = (angle * Math.PI) / 180;
        const radius = 115; // Distance from center
        
        const x = Math.cos(radian) * radius + 150; // 150 is half of clock width
        const y = Math.sin(radian) * radius + 150; // 150 is half of clock height
        
        numberElement.style.left = `${x}px`;
        numberElement.style.top = `${y}px`;
        
        numbersContainer.appendChild(numberElement);
    });
}

// Update clock hands
function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    
    // Calculate angles - no need to subtract 90 degrees since hands start from center
    const hourAngle = (hours * 30) + (minutes * 0.5); // 30 degrees per hour + minute adjustment
    const minuteAngle = minutes * 6; // 6 degrees per minute
    const secondAngle = (seconds * 6) + (milliseconds * 0.006); // 6 degrees per second + smooth milliseconds
    
    // Update hand positions
    document.getElementById('hourHand').style.transform = `translate(-50%, -100%) rotate(${hourAngle}deg)`;
    document.getElementById('minuteHand').style.transform = `translate(-50%, -100%) rotate(${minuteAngle}deg)`;
    document.getElementById('secondHand').style.transform = `translate(-50%, -100%) rotate(${secondAngle}deg)`;
    
    // Update digital time
    const digitalTime = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('digitalTime').textContent = digitalTime;
}

// Initialize clock
function initClock() {
    createHourMarkers();
    createMinuteMarkers();
    createNumbers();
    updateClock();
    
    // Update every 50 milliseconds for smooth second hand movement
    setInterval(updateClock, 50);
}

// Start the clock when page loads
window.addEventListener('load', initClock);