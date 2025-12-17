const trainingCosts = {
  beginner: 25.00,
  intermediate: 30.00,
  elite: 35.00
};

const coachingHourlyRate = 9.50;

export function calculateCosts(data) {
  const trainingCost = trainingCosts[data.trainingPlan];
  const coachingCost = data.privateCoachingHours * coachingHourlyRate;
  const totalCost = trainingCost + coachingCost;

  return {
    trainingCost: trainingCost.toFixed(2),
    coachingCost: coachingCost.toFixed(2),
    totalCost: totalCost.toFixed(2)
  };
}

