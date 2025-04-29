<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Plant Growth Simulator</title>
  <style>
    :root {
      --soil-color: #8B4513;
      --light-soil: #A0522D;
      --plant-green: #2E8B57;
      --sky-blue: #87CEEB;
      --sun-yellow: #FFD700;
      --water-blue: #1E90FF;
      --btn-hover: #3CB371;
      --bg-color: #F5F5DC;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    body {
      background-color: var(--bg-color);
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      color: #333;
    }
    
    header {
      background-color: var(--plant-green);
      color: white;
      padding: 1rem;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    main {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem 1rem;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }
    
    .simulator {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 800px;
    }
    
    .controls {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
      width: 100%;
    }
    
    .control-panel {
      background-color: #fff;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }
    
    .slider-container {
      margin-bottom: 1.5rem;
    }
    
    .slider-container label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
      display: flex;
      align-items: center;
    }
    
    .slider-icon {
      margin-right: 0.5rem;
      font-size: 1.5rem;
    }
    
    .slider-wrapper {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .slider {
      flex: 1;
      -webkit-appearance: none;
      appearance: none;
      height: 10px;
      border-radius: 5px;
      background: #ddd;
      outline: none;
    }
    
    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      cursor: pointer;
    }
    
    .water-slider::-webkit-slider-thumb {
      background: var(--water-blue);
    }
    
    .sunlight-slider::-webkit-slider-thumb {
      background: var(--sun-yellow);
    }
    
    .slider-value {
      min-width: 40px;
      text-align: center;
    }
    
    .action-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
    
    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 1rem;
      min-width: 120px;
      color: white;
    }
    
    .btn:focus {
      outline: 3px solid rgba(0, 0, 0, 0.3);
    }
    
    .btn-grow {
      background-color: var(--plant-green);
    }
    
    .btn-grow:hover {
      background-color: var(--btn-hover);
    }
    
    .btn-reset {
      background-color: #777;
    }
    
    .btn-reset:hover {
      background-color: #555;
    }
    
    .garden {
      position: relative;
      width: 100%;
      max-width: 500px;
      height: 400px;
      margin-top: 2rem;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    
    .sky {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 60%;
      background-color: var(--sky-blue);
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      padding: 1rem;
      transition: background-color 0.5s;
    }
    
    .sun {
      width: 60px;
      height: 60px;
      background-color: var(--sun-yellow);
      border-radius: 50%;
      box-shadow: 0 0 20px 5px rgba(255, 215, 0, 0.7);
      opacity: 0.7;
      transition: opacity 0.5s, box-shadow 0.5s;
    }
    
    .soil {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 40%;
      background-color: var(--soil-color);
      display: flex;
      justify-content: center;
      transition: background-color 0.5s;
    }
    
    .plant-container {
      position: absolute;
      bottom: 40%;
      left: 50%;
      transform: translateX(-50%);
      width: 200px;
      height: 300px;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      z-index: 5;
    }
    
    .plant {
      width: 10px;
      background-color: var(--plant-green);
      border-radius: 4px;
      transform-origin: bottom center;
      transition: height 1s ease;
      position: relative;
    }
    
    .leaves {
      display: none;
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
    }
    
    .leaf {
      position: absolute;
      background-color: var(--plant-green);
      border-radius: 50%;
      transform-origin: bottom center;
      opacity: 0;
      transition: opacity 1s ease;
    }
    
    .leaf-left {
      width: 30px;
      height: 15px;
      left: -25px;
      transform: rotate(-30deg);
    }
    
    .leaf-right {
      width: 30px;
      height: 15px;
      right: -25px;
      transform: rotate(30deg);
    }
    
    .flower {
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 30px;
      background-color: #ff69b4;
      border-radius: 50%;
      display: none;
    }
    
    .seed {
      width: 10px;
      height: 15px;
      background-color: #8B4513;
      border-radius: 50%;
      margin-bottom: -7px;
    }
    
    .water-drops {
      position: absolute;
      top: 50%;
      width: 100%;
      display: none;
      justify-content: space-around;
      z-index: 4;
    }
    
    .drop {
      width: 8px;
      height: 15px;
      background-color: var(--water-blue);
      border-radius: 50%;
      opacity: 0;
      animation: falling 2s linear infinite;
    }
    
    .drop:nth-child(2) {
      animation-delay: 0.3s;
    }
    
    .drop:nth-child(3) {
      animation-delay: 0.6s;
    }
    
    .message-box {
      margin-top: 2rem;
      padding: 1rem;
      border-radius: 8px;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;
      min-height: 60px;
    }
    
    .progress-container {
      width: 100%;
      max-width: 400px;
      margin-top: 1rem;
      background-color: #eee;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .progress-bar {
      height: 20px;
      width: 0%;
      background-color: var(--plant-green);
      text-align: center;
      line-height: 20px;
      color: white;
      font-size: 0.8rem;
      transition: width 0.5s ease;
    }
    
    @keyframes falling {
      0% {
        transform: translateY(0) scale(1);
        opacity: 0.8;
      }
      80% {
        opacity: 0.8;
      }
      100% {
        transform: translateY(100px) scale(0.8);
        opacity: 0;
      }
    }
    
    .status {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .status-item {
      background-color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .status-icon {
      margin-right: 0.5rem;
    }
    
    footer {
      background-color: var(--plant-green);
      color: white;
      text-align: center;
      padding: 1rem;
      margin-top: 2rem;
    }
    
    /* Accessibility focus styles */
    button:focus, input:focus {
      outline: 3px solid #4A90E2;
      outline-offset: 2px;
    }
    
    /* Make it responsive */
    @media (max-width: 768px) {
      .controls {
        flex-direction: column;
        align-items: center;
      }
      
      .garden {
        height: 350px;
      }
      
      .plant-container {
        width: 150px;
      }
    }
    
    @media (max-width: 480px) {
      .garden {
        height: 300px;
      }
      
      .action-buttons {
        flex-direction: column;
      }
      
      .slider-wrapper {
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .slider-value {
        align-self: flex-end;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>Plant Growth Simulator</h1>
  </header>
  
  <main>
    <div class="simulator">
      <div class="controls">
        <div class="control-panel">
          <div class="slider-container">
            <label for="water">
              <span class="slider-icon">💧</span> Water Level
            </label>
            <div class="slider-wrapper">
              <input type="range" id="water" class="slider water-slider" min="0" max="10" value="5">
              <span class="slider-value" id="water-value">5</span>
            </div>
          </div>
          
          <div class="slider-container">
            <label for="sunlight">
              <span class="slider-icon">☀️</span> Sunlight Level
            </label>
            <div class="slider-wrapper">
              <input type="range" id="sunlight" class="slider sunlight-slider" min="0" max="10" value="5">
              <span class="slider-value" id="sunlight-value">5</span>
            </div>
          </div>
          
          <div class="action-buttons">
            <button id="grow-btn" class="btn btn-grow">Grow Plant</button>
            <button id="reset-btn" class="btn btn-reset">Reset</button>
          </div>
        </div>
      </div>
      
      <div class="garden">
        <div class="sky">
          <div class="sun"></div>
        </div>
        <div class="soil"></div>
        <div class="water-drops">
          <div class="drop"></div>
          <div class="drop"></div>
          <div class="drop"></div>
        </div>
        <div class="plant-container">
          <div class="seed"></div>
          <div class="plant" style="height: 0px;">
            <div class="leaves">
              <div class="leaf leaf-left"></div>
              <div class="leaf leaf-right"></div>
            </div>
            <div class="flower"></div>
          </div>
        </div>
      </div>
      
      <div class="message-box" id="message">
        Plant your seed and help it grow with water and sunlight!
      </div>
      
      <div class="progress-container">
        <div class="progress-bar" id="progress-bar">0%</div>
      </div>
      
      <div class="status">
        <div class="status-item">
          <span class="status-icon">🌱</span>
          <span id="growth-stage">Seed</span>
        </div>
        <div class="status-item">
          <span class="status-icon">📊</span>
          <span id="health-status">Healthy</span>
        </div>
      </div>
    </div>
  </main>
  
  <footer>
    <p>Plant Growth Simulator &copy; 2025 | Created with 💚 for nature</p>
  </footer>
  
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // Elements
      const waterSlider = document.getElementById('water');
      const sunlightSlider = document.getElementById('sunlight');
      const waterValue = document.getElementById('water-value');
      const sunlightValue = document.getElementById('sunlight-value');
      const growBtn = document.getElementById('grow-btn');
      const resetBtn = document.getElementById('reset-btn');
      const plant = document.querySelector('.plant');
      const seed = document.querySelector('.seed');
      const leaves = document.querySelector('.leaves');
      const flower = document.querySelector('.flower');
      const leavesList = document.querySelectorAll('.leaf');
      const sky = document.querySelector('.sky');
      const sun = document.querySelector('.sun');
      const soil = document.querySelector('.soil'); 
      const waterDrops = document.querySelector('.water-drops');
      const message = document.getElementById('message');
      const progressBar = document.getElementById('progress-bar');
      const growthStage = document.getElementById('growth-stage');
      const healthStatus = document.getElementById('health-status');
      
      // Variables
      let plantHeight = 0;
      let growthProgress = 0;
      let stage = 'seed';
      let growthInterval;
      let isWatering = false;
      
      // Update sliders display values
      waterSlider.addEventListener('input', () => {
        waterValue.textContent = waterSlider.value;
      });
      
      sunlightSlider.addEventListener('input', () => {
        sunlightValue.textContent = sunlightSlider.value;
        updateSun(parseInt(sunlightSlider.value));
      });
      
      // Initialize
      function init() {
        plantHeight = 0;
        growthProgress = 0;
        stage = 'seed';
        
        plant.style.height = '0px';
        seed.style.display = 'block';
        leaves.style.display = 'none';
        flower.style.display = 'none';
        
        waterSlider.value = 5;
        sunlightSlider.value = 5;
        waterValue.textContent = '5';
        sunlightValue.textContent = '5';
        
        updateSun(5);
        updateSoil(5);
        
        progressBar.style.width = '0%';
        progressBar.textContent = '0%';
        
        growthStage.textContent = 'Seed';
        healthStatus.textContent = 'Healthy';
        
        message.textContent = 'Plant your seed and help it grow with water and sunlight!';
        message.style.color = '#333';
      }
      
      // Update sun based on sunlight value
      function updateSun(value) {
        const opacity = value / 10;
        const intensity = value / 10;
        sun.style.opacity = 0.4 + (opacity * 0.6);
        sun.style.boxShadow = `0 0 ${20 + value * 3}px ${5 + value}px rgba(255, 215, 0, ${intensity * 0.7})`;
        
        // Update sky color
        const r = 135 + Math.min(value * 12, 120);
        const g = 206 + Math.min(value * 5, 49);
        const b = 235;
        sky.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      }
      
      // Update soil based on water value
      function updateSoil(value) {
        const darkness = 1 - (value / 15);
        const r = 139 * darkness;
        const g = 69 * darkness;
        const b = 19 * darkness;
        soil.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      }
      
      // Water the plant
      function showWatering(waterLevel) {
        if (isWatering) return;
        
        isWatering = true;
        waterDrops.style.display = 'flex';
        
        // Show for longer based on water level
        setTimeout(() => {
          waterDrops.style.display = 'none';
          isWatering = false;
        }, waterLevel * 300);
        
        updateSoil(waterLevel);
      }
      
      // Grow the plant
      function growPlant() {
        const waterLevel = parseInt(waterSlider.value);
        const sunlightLevel = parseInt(sunlightSlider.value);
        
        // Check if values are optimal
        const isOptimalWater = waterLevel >= 4 && waterLevel <= 8;
        const isOptimalSunlight = sunlightLevel >= 4 && sunlightLevel <= 8;
        
        // Calculate growth factor (0-1)
        let waterFactor = 1 - Math.abs(waterLevel - 6) / 6;
        let sunlightFactor = 1 - Math.abs(sunlightLevel - 6) / 6;
        let growthFactor = waterFactor * sunlightFactor;
        
        // Show watering animation
        showWatering(waterLevel);
        
        // Update sun intensity
        updateSun(sunlightLevel);
        
        // Clear previous interval if any
        if (growthInterval) {
          clearInterval(growthInterval);
        }
        
        // Set feedback message
        if (!isOptimalWater && !isOptimalSunlight) {
          message.textContent = 'Too little water and sunlight. Adjust both for better growth!';
          message.style.color = '#ff4d4d';
          healthStatus.textContent = 'Struggling';
        } else if (!isOptimalWater) {
          if (waterLevel < 4) {
            message.textContent = 'Not enough water. Your plant needs more!';
            message.style.color = '#ff4d4d';
            healthStatus.textContent = 'Thirsty';
          } else {
            message.textContent = 'Too much water! Your plant might drown.';
            message.style.color = '#ff4d4d';
            healthStatus.textContent = 'Overwatered';
          }
        } else if (!isOptimalSunlight) {
          if (sunlightLevel < 4) {
            message.textContent = 'Your plant needs more sunlight to grow properly!';
            message.style.color = '#ff4d4d';
            healthStatus.textContent = 'Lacking light';
          } else {
            message.textContent = 'Too much sunlight! Your plant might burn.';
            message.style.color = '#ff4d4d';
            healthStatus.textContent = 'Overexposed';
          }
        } else {
          message.textContent = 'Perfect conditions! Your plant is growing well.';
          message.style.color = '#2E8B57';
          healthStatus.textContent = 'Thriving';
        }
        
        // Grow over time
        growthInterval = setInterval(() => {
          // Add growth progress
          growthProgress += growthFactor * 2;
          
          // Update progress bar
          const progressPercent = Math.min(Math.floor(growthProgress), 100);
          progressBar.style.width = `${progressPercent}%`;
          progressBar.textContent = `${progressPercent}%`;
          
          // Determine growth stage
          if (progressPercent >= 100 && stage !== 'flower') {
            // Final stage - flowering
            stage = 'flower';
            plantHeight = 180;
            plant.style.height = `${plantHeight}px`;
            flower.style.display = 'block';
            leaves.style.display = 'block';
            leavesList.forEach(leaf => leaf.style.opacity = '1');
            seed.style.display = 'none';
            growthStage.textContent = 'Flowering';
            message.textContent = 'Congratulations! Your plant has bloomed!';
            message.style.color = '#2E8B57';
            healthStatus.textContent = 'Blooming';
            clearInterval(growthInterval);
          } else if (progressPercent >= 60 && stage !== 'mature' && stage !== 'flower') {
            // Mature plant with leaves
            stage = 'mature';
            plantHeight = 120;
            plant.style.height = `${plantHeight}px`;
            seed.style.display = 'none';
            leaves.style.display = 'block';
            leavesList.forEach(leaf => leaf.style.opacity = '1');
            growthStage.textContent = 'Mature Plant';
          } else if (progressPercent >= 30 && stage !== 'growing' && stage !== 'mature' && stage !== 'flower') {
            // Growing plant
            stage = 'growing';
            plantHeight = 60;
            plant.style.height = `${plantHeight}px`;
            seed.style.display = 'none';
            leaves.style.display = 'block';
            leavesList.forEach(leaf => leaf.style.opacity = '0.7');
            growthStage.textContent = 'Growing';
          } else if (progressPercent >= 10 && stage === 'seed') {
            // Sprouting
            stage = 'sprout';
            plantHeight = 20;
            plant.style.height = `${plantHeight}px`;
            seed.style.display = 'none';
            growthStage.textContent = 'Sprouting';
          }
          
          // Stop interval if plant is fully grown
          if (progressPercent >= 100) {
            clearInterval(growthInterval);
          }
        }, 500);
      }
      
      // Event listeners
      growBtn.addEventListener('click', growPlant);
      resetBtn.addEventListener('click', init);
      
      // Initialize the simulation
      init();
    });
  </script>
</body>
</html>
