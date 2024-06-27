import { BooleanToYnPipe } from './boolean-to-yn.pipe';

describe('BooleanToYnPipe', () => {
  it('create an instance', () => {
    const pipe = new BooleanToYnPipe();
    expect(pipe).toBeTruthy();
  });
});
