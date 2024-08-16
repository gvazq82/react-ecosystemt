import { expect } from "chai";
import { getBorderStyleForDate } from "../TodoListItem";

describe('### Test getBorderStyleForDate', () => {
    it('should return none when the date is less than five days ago', () => {
        const today = Date.now();
        const recentDate = new Date(Date.now() - 86400000 * 3);

        const expected = 'none';
        const actual = getBorderStyleForDate(recentDate, today);

        expect(expected).to.equal(actual);
    });
    
    it('should return a border when the date is greater than five days ago', () => {
        const today = Date.now();
        const recentDate = new Date(Date.now() - 86400000 * 7);

        const expected = '2px solid red';
        const actual = getBorderStyleForDate(recentDate, today);

        expect(expected).to.equal(actual);
    });
})