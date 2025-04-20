export interface HistoryItem {
    id: number;
    query: string;
    response: string;
    timestamp: string;
    budgetBreakdown?: Record<string, number>;
  }
  
  export const saveToHistory = (item: Omit<HistoryItem, 'id'>) => {
    try {
      // Get existing history
      const historyString = localStorage.getItem('queryHistory');
      const history: HistoryItem[] = historyString ? JSON.parse(historyString) : [];
      
      // Create new item with ID
      const newItem: HistoryItem = {
        ...item,
        id: history.length > 0 ? Math.max(...history.map(h => h.id)) + 1 : 1
      };
      
      // Add to history
      history.push(newItem);
      
      // Save back to localStorage
      localStorage.setItem('queryHistory', JSON.stringify(history));
      
      return newItem;
    } catch (error) {
      console.error('Error saving to history:', error);
      return null;
    }
  };
  
  export const getHistory = (): HistoryItem[] => {
    try {
      const historyString = localStorage.getItem('queryHistory');
      return historyString ? JSON.parse(historyString) : [];
    } catch (error) {
      console.error('Error getting history:', error);
      return [];
    }
  };
  
  export const clearHistory = () => {
    localStorage.removeItem('queryHistory');
  };