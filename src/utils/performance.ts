// Performance monitoring utility
export const performance = {
  mark: (name: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(name);
    }
  },
  
  measure: (name: string, startMark: string, endMark: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      try {
        const measure = window.performance.measure(name, startMark, endMark);
        console.log(`⏱️ ${name}: ${Math.round(measure.duration)}ms`);
        return measure.duration;
      } catch (error) {
        console.warn(`Failed to measure ${name}:`, error);
      }
    }
  },
  
  startTimer: (name: string) => {
    const startTime = Date.now();
    return () => {
      const duration = Date.now() - startTime;
      console.log(`⏱️ ${name}: ${duration}ms`);
      return duration;
    };
  }
};
