import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechChatComponent } from './tech-chat.component';

describe('TechChatComponent', () => {
  let component: TechChatComponent;
  let fixture: ComponentFixture<TechChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
