import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-page-1',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8 max-w-3xl mx-auto">
      <h1 class="text-4xl text-gray-800 mb-4">Test Page 1</h1>
      <p class="text-gray-600 mb-6">
        This is the first test page for the dashboard.
      </p>
      <div class="bg-gray-100 p-6 rounded-lg mt-4">
        <p class="text-gray-700 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <ul class="ml-6 text-gray-700 space-y-2">
          <li class="list-disc">Item 1</li>
          <li class="list-disc">Item 2</li>
          <li class="list-disc">Item 3</li>
        </ul>
      </div>
    </div>
  `,
})
export class TestPage1Component {}
