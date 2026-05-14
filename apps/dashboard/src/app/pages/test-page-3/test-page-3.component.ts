import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-page-3',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8 max-w-3xl mx-auto">
      <h1 class="text-4xl text-gray-800 mb-4">Test Page 3</h1>
      <p class="text-gray-600 mb-6">
        This is the third test page for the dashboard.
      </p>
      <div class="bg-gray-100 p-6 rounded-lg mt-4">
        <p class="text-gray-700 mb-6">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white p-6 rounded-lg text-center shadow-sm">
            <div class="text-3xl text-green-500 mb-2">✓</div>
            <h3 class="mb-2 text-gray-800 font-semibold">Feature One</h3>
            <p class="m-0 text-gray-600 text-sm">
              Description of feature one goes here.
            </p>
          </div>
          <div class="bg-white p-6 rounded-lg text-center shadow-sm">
            <div class="text-3xl text-green-500 mb-2">✓</div>
            <h3 class="mb-2 text-gray-800 font-semibold">Feature Two</h3>
            <p class="m-0 text-gray-600 text-sm">
              Description of feature two goes here.
            </p>
          </div>
          <div class="bg-white p-6 rounded-lg text-center shadow-sm">
            <div class="text-3xl text-green-500 mb-2">✓</div>
            <h3 class="mb-2 text-gray-800 font-semibold">Feature Three</h3>
            <p class="m-0 text-gray-600 text-sm">
              Description of feature three goes here.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TestPage3Component {}
