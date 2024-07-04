"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLast12MonthsData = void 0;
async function generateLast12MonthsData(model) {
    const last12Months = [];
    const currentDate = new Date();
    for (let i = 0; i < 12; i++) {
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0);
        const monthYear = startDate.toLocaleString("default", {
            month: "short",
            year: "numeric",
        });
        const count = await model.countDocuments({
            createdAt: {
                $gte: startDate,
                $lt: endDate,
            },
        });
        last12Months.unshift({ month: monthYear, count });
    }
    return { last12Months };
}
exports.generateLast12MonthsData = generateLast12MonthsData;
