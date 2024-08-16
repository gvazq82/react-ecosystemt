import { expect } from 'chai';
import { getCompletedTodos } from '../selectors';

describe('### test todos selectors', () => {
    it('should return the correct completed todos', () => {
        const fakeTodos = [{
            text: 'Say Hello',
            isCompleted: true,
        }, {
            text: 'Say Goodbye',
            isCompleted: false,
        }, {
            text: 'Say Hello',
            isCompleted: false,
        }];

        const expected = [{
            text: 'Say Hello',
            isCompleted: true,
        }];

        const actual = getCompletedTodos.resultFunc(fakeTodos);
        expect(actual).to.deep.equal(expected);
    });
});