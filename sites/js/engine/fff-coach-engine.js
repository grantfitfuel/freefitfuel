const COACH = {

  getSummary(){
    let totalSessions = 0
    let skipped = 0
    let improvements = 0

    for(let i=0;i<localStorage.length;i++){
      const k = localStorage.key(i)
      if(!k.startsWith('fff.workouts.v1.')) continue

      const data = JSON.parse(localStorage.getItem(k) || '{}')

      if(Object.keys(data).length > 0) totalSessions++

      const best = parseFloat(localStorage.getItem(k + '.best') || '0')
      if(best > 0) improvements++
    }

    return { totalSessions, skipped, improvements }
  },

  analyse(){

    const s = this.getSummary()

    const insights = []

    // 🔻 Low engagement
    if(s.totalSessions < 3){
      insights.push({
        type: "nudge",
        msg: "Let’s build consistency first. Keep sessions short and achievable this week."
      })
    }

    // 🔥 Good progress
    if(s.improvements >= 5){
      insights.push({
        type: "progress",
        msg: "You’re progressing well. Increasing intensity slightly this week."
      })
    }

    // 😴 Fatigue detection (basic)
    if(s.totalSessions > 6 && s.improvements === 0){
      insights.push({
        type: "fatigue",
        msg: "Progress has slowed. Reducing volume and adding recovery work."
      })
    }

    return insights
  }
}
