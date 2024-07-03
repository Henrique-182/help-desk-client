import { UserPermissionPipe } from './user-permission.pipe';

describe('UserPermissionPipe', () => {
  it('create an instance', () => {
    const pipe = new UserPermissionPipe();
    expect(pipe).toBeTruthy();
  });
});
