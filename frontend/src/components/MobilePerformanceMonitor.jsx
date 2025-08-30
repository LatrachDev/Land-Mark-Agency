import { useEffect } from 'react';

const MobilePerformanceMonitor = () => {
  useEffect(() => {
    // Disabled - user doesn't want to see the performance monitor
    return;
  }, []);

  // Component disabled - return null to not render anything
  return null;
};

export default MobilePerformanceMonitor;
