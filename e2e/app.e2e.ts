import { NgCouncilorePage } from './app.po';

describe('ng-councilore App', function() {
  let page: NgCouncilorePage;

  beforeEach(() => {
    page = new NgCouncilorePage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ng-councilore works!');
  });
});
