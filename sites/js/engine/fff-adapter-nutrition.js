// FreeFitFuel Adapter — Nutrition UI v1
(function(){
  'use strict';
  function renderCard(){
    if(!window.FFFNutrition) return;
    var target = document.getElementById('nutritionEngineOutput') || document.getElementById('coachNutritionOutput') || document.getElementById('todayCaloriesMirror') || document.getElementById('coachSummary');
    if(!target) return;
    var rec = window.FFFNutrition.recommendation();
    if(target.id === 'todayCaloriesMirror'){
      target.textContent = 'Calories: ' + rec.calories.low + '-' + rec.calories.high;
      return;
    }
    if(document.getElementById('fffNutritionAdapterCard')) return;
    var card = document.createElement('div');
    card.id='fffNutritionAdapterCard';
    card.className='card';
    card.innerHTML = '<h3>Adaptive nutrition</h3>'+
      '<p><strong>Calories:</strong> '+rec.calories.low+'-'+rec.calories.high+' kcal</p>'+
      '<p><strong>Protein:</strong> '+rec.macros.protein.low+'-'+rec.macros.protein.high+'g</p>'+
      '<p><strong>Carbs:</strong> '+rec.macros.carbs.low+'-'+rec.macros.carbs.high+'g • <strong>Fats:</strong> '+rec.macros.fats.low+'-'+rec.macros.fats.high+'g</p>'+
      '<p class="sub">'+rec.reasons.join(' ')+'</p>';
    target.appendChild ? target.appendChild(card) : target.parentNode.appendChild(card);
  }
  window.FFFAdapterNutrition = { version:'1.0', render:renderCard };
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderCard);
  else renderCard();
})();
