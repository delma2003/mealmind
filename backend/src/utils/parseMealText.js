"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMealText = void 0;
const parseMealText = (rawText) => {
    const days = rawText.split(/Day\s+\d+:/i).slice(1); // skip any intro
    return days.map((dayBlock, index) => {
        const lines = dayBlock.trim().split('\n').map(line => line.trim());
        const breakfast = lines.find(line => /breakfast/i.test(line))?.replace(/-?\s*Breakfast:\s*/i, '') ?? '';
        const lunch = lines.find(line => /lunch/i.test(line))?.replace(/-?\s*Lunch:\s*/i, '') ?? '';
        const dinner = lines.find(line => /dinner/i.test(line))?.replace(/-?\s*Dinner:\s*/i, '') ?? '';
        return {
            day: `Day ${index + 1}`,
            breakfast: breakfast.trim(),
            lunch: lunch.trim(),
            dinner: dinner.trim(),
        };
    });
};
exports.parseMealText = parseMealText;
