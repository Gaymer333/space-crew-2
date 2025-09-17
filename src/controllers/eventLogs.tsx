import { createContext, useContext, useState, ReactNode } from 'react';

export interface EventLog {
  id: string;
  message: string | ReactNode;
  timestamp: Date;
  type?: 'info' | 'warning' | 'error';
}

interface EventLogsContextType {
  logs: EventLog[];
  addLog: (log: Omit<EventLog, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
}

const EventLogsContext = createContext<EventLogsContextType | undefined>(undefined);

export const useEventLogs = () => {
  const context = useContext(EventLogsContext);
  if (!context) {
    throw new Error('useEventLogs must be used within an EventLogsProvider');
  }
  return context;
};

export const EventLogsProvider = ({ children }: { children: ReactNode }) => {
  const [logs, setLogs] = useState<EventLog[]>([]);

  const addLog = (log: Omit<EventLog, 'id' | 'timestamp'>) => {
    setLogs(prev => [
      ...prev,
      {
        ...log,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
      },
    ]);
  };

  const clearLogs = () => setLogs([]);

  return (
    <EventLogsContext.Provider value={{ logs, addLog, clearLogs }}>
      {children}
    </EventLogsContext.Provider>
  );
};