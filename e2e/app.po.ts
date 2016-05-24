export class NgCouncilorePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ng-councilore-app h1')).getText();
  }
}
