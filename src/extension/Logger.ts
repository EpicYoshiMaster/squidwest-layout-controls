import * as fs from 'fs';
import { formatTimeHMSC, formatDateHM } from '../helpers/utils';
 
export class Logger {
	private logName: string;
	private stream: fs.WriteStream;

	constructor(logName: string, includeDate: boolean) {
		const currentTime = new Date();
		const date = (currentTime.getMonth() + 1) + "_" + currentTime.getDate() + "_" + currentTime.getFullYear();

		this.logName = logName + (includeDate ? `_${date}` : ``);
		this.stream = fs.createWriteStream(`./logs/${this.logName}.log`, { flags: 'a' });
	}

	//Writes one line of text, then moves to the next line.
	write(text: string) {
		if(!this.stream) {
			console.log(`LOGGER: Error, attempted to write file with non-existant stream!`);
			return;
		}

		this.stream.write(text + "\n");
	}
}

type TimeLog = { name: string, time: number, isLabel: boolean };

export class TimeLogger extends Logger {
	private timeLog: TimeLog[] = [];
	private recordIndex = -1;

	addTime(name: string, time: number, isLabel: boolean = false) {

		if(this.timeLog.length > 0) {
			let prevTime = this.timeLog[this.timeLog.length - 1];

			//In the event this is just a label, take the name of the previous log if it exists
			if(prevTime.isLabel && this.timeLog.length > 1) {
				prevTime = {...prevTime, name: this.timeLog[this.timeLog.length - 2].name};
			}

			const duration = time - prevTime.time;

			this.write(`${formatDateHM(new Date(prevTime.time))} - ${prevTime.name} (${formatTimeHMSC(duration)})`);

			if(name.includes("Game")) {
				let startofBreakTime = this.timeLog.slice().reverse().find(
					(log, index, array) => {
						if(log.isLabel) return true;

						//Next entry in array is the Game scene (reversed)
						if(index < array.length - 1 && array[index + 1].name.includes("Game")) {
							return true;
						}

						return false;
					}
				);

				if(!startofBreakTime) {
					startofBreakTime = this.timeLog[0];
				}

				const breakTime = time - startofBreakTime.time;

				this.write(`\nBreak Time: ${formatTimeHMSC(breakTime)}\n`);
			}
		}

		this.timeLog.push({ name, time, isLabel });
	}

	startRecord(recordLabel: string, time: number) {
		if(this.recordIndex >= 0) {
			console.log(`TIMELOGGER: Warning, attempted to start a record while already recording.`);
			return;
		}

		this.addTime(recordLabel, time, true);

		this.write(`\n${formatDateHM(new Date(time))} === ${recordLabel} ===\n`);

		this.recordIndex = this.timeLog.length - 1;
	}

	endRecord(recordLabel: string, time: number) {
		if(this.recordIndex < 0) {
			console.log(`TIMELOGGER: Warning, attempted to finish a record without starting recording.`);
			return;
		}

		this.addTime(recordLabel, time, true);

		this.write(`\n${formatDateHM(new Date(time))} === ${recordLabel} ===\n`);

		const totalTime = this.timeLog[this.timeLog.length - 1].time - this.timeLog[this.recordIndex].time; 
		const gameTime = this.timeLog.reduce((accum, log, index, array) => {
			if(log.name.includes("Game") && index < array.length - 1) {
				return accum + (array[index + 1].time - log.time);
			}
			else {
				return accum;
			}
		}, 0);
		const breakTime = totalTime - gameTime;

		this.write("Summary\n");
		this.write(`Total Time: ${formatTimeHMSC(totalTime)}`);
		this.write(`Game Time: ${formatTimeHMSC(gameTime)}`);
		this.write(`Break Time: ${formatTimeHMSC(breakTime)}\n`);

		this.recordIndex = -1;
	}

}