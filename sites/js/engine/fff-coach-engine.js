const COACH = {

  getSummary(){
    let totalSessions = 0
    let improvements = 0

    for(let i=0;i<localStorage.length;i++){
      const k = localStorage.key(i)
      if(!k.startsWith('fff.workouts.v1.')) continue

      const data = JSON.parse(localStorage.getItem(k) || '{}')

      if(Object.keys(data).length > 0) totalSessions++

      const best = parseFloat(localStorage.getItem(k + '.best') || '0')
      if(best > 0) improvements++
    }

    return { totalSessions, improvements }
  },

  analyse(){

    const s = this.getSummary()
    const insights = []

    if(s.totalSessions < 3){
      insights.push({
        type: "nudge",
        msg: "Start small. Focus on consistency."
      })
    }

    if(s.improvements >= 5){
      insights.push({
        type: "progress",
        msg: "Progress detected. Increasing intensity."
      })
    }

    if(s.totalSessions > 6 && s.improvements === 0){
      insights.push({
        type: "fatigue",
        msg: "Fatigue detected. Reducing volume."
      })
    }

    return insights
  }
}
