import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

interface LoggingMessage {
    date: string;
    message: string;
}

function LoggingComponent() {
    const [logMessages, setLogMessages] = useState<LoggingMessage[]>();

    useEffect(() => {
        populateLogMessagesData();
    }, []);

    async function populateLogMessagesData() {
        //const response = await fetch('weatherforecast');
        //const data = await response.json();
        const data: LoggingMessage[] = [
            { date: "2024-03-11", message: "Error: Server connection lost" },
            { date: "2024-03-10", message: "Warning: High CPU usage detected" },
            { date: "2024-03-09", message: "Info: New user registered" },
            { date: "2024-03-08", message: "Error: Database query failed" },
            { date: "2024-03-07", message: "Error: File not found" }
        ];
        setLogMessages(data);
    }


    return (
        <div>
            {logMessages?.map((log, index) => (
                <p key={index}>{log.date}: {log.message}</p>
            ))}
        </div>
    );
}

export default LoggingComponent;