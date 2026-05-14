import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-page-2',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8 max-w-3xl mx-auto">
      <h1 class="text-4xl text-gray-800 mb-4">Test Page 2</h1>
      <p class="text-gray-600 mb-6">
        This is the second test page for the dashboard.
      </p>
      <div class="bg-gray-100 p-6 rounded-lg mt-4">
        <p class="text-gray-700 mb-6">
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-white p-4 rounded-lg text-center shadow-sm">
            <h3 class="m-0 text-3xl text-blue-500">100</h3>
            <p class="mt-2 mb-0 text-gray-600">Users</p>
          </div>
          <div class="bg-white p-4 rounded-lg text-center shadow-sm">
            <h3 class="m-0 text-3xl text-blue-500">250</h3>
            <p class="mt-2 mb-0 text-gray-600">Views</p>
          </div>
          <div class="bg-white p-4 rounded-lg text-center shadow-sm">
            <h3 class="m-0 text-3xl text-blue-500">50</h3>
            <p class="mt-2 mb-0 text-gray-600">Interactions</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TestPage2Component {}
