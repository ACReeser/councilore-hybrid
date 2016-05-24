import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ShieldpickerComponent } from './shieldpicker.component';

describe('Component: Shieldpicker', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [ShieldpickerComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ShieldpickerComponent],
      (component: ShieldpickerComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ShieldpickerComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ShieldpickerComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-shieldpicker></app-shieldpicker>
  `,
  directives: [ShieldpickerComponent]
})
class ShieldpickerComponentTestController {
}

