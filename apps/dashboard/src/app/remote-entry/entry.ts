import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterOutlet, RouterLink, CommonModule],
  selector: 'app-dashboard-entry',
  template: `
    <div
      class="min-h-screen bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 font-sans"
    >
      <header
        class="bg-black/20 text-white p-8 text-center border-b border-white/10"
      >
        <h1 class="text-5xl font-bold m-0">Dashboard</h1>
        <p class="text-lg m-2 opacity-90">Welcome to the Elevate Dashboard</p>
      </header>

      <nav class="flex gap-0 bg-black/10 px-8 border-b-2 border-white/10">
        <a
          routerLink="test-1"
          class="text-white px-6 py-4 no-underline border-b-4 border-transparent transition-all cursor-pointer font-medium hover:border-yellow-400 hover:bg-white/10"
          >Test Page 1</a
        >
        <a
          routerLink="test-2"
          class="text-white px-6 py-4 no-underline border-b-4 border-transparent transition-all cursor-pointer font-medium hover:border-yellow-400 hover:bg-white/10"
          >Test Page 2</a
        >
        <a
          routerLink="test-3"
          class="text-white px-6 py-4 no-underline border-b-4 border-transparent transition-all cursor-pointer font-medium hover:border-yellow-400 hover:bg-white/10"
          >Test Page 3</a
        >
      </nav>

      <main class="p-8 max-w-5xl mx-auto">
        <div class="text-white">
          <h2 class="text-4xl m-0 mb-8 text-center">Quick Overview</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              class="bg-white p-8 rounded-xl shadow-lg transition-all hover:-translate-y-1.25 hover:shadow-2xl text-gray-800"
            >
              <h3 class="text-2xl mb-4 m-0 text-indigo-600">📊 Analytics</h3>
              <p class="m-0 mb-6 text-gray-600 leading-relaxed">
                Track your performance metrics and data insights
              </p>
              <a
                routerLink="test-2"
                class="inline-block bg-linear-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg no-underline font-semibold transition-all hover:scale-105 hover:shadow-lg"
                >View Analytics</a
              >
            </div>
            <div
              class="bg-white p-8 rounded-xl shadow-lg transition-all hover:-translate-y-1.25 hover:shadow-2xl text-gray-800"
            >
              <h3 class="text-2xl mb-4 m-0 text-indigo-600">📝 Reports</h3>
              <p class="m-0 mb-6 text-gray-600 leading-relaxed">
                Generate and view detailed reports
              </p>
              <a
                routerLink="test-1"
                class="inline-block bg-linear-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg no-underline font-semibold transition-all hover:scale-105 hover:shadow-lg"
                >View Reports</a
              >
            </div>
            <div
              class="bg-white p-8 rounded-xl shadow-lg transition-all hover:-translate-y-1.25 hover:shadow-2xl text-gray-800"
            >
              <h3 class="text-2xl mb-4 m-0 text-indigo-600">✨ Features</h3>
              <p class="m-0 mb-6 text-gray-600 leading-relaxed">
                Explore available features and capabilities
              </p>
              <a
                routerLink="test-3"
                class="inline-block bg-linear-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg no-underline font-semibold transition-all hover:scale-105 hover:shadow-lg"
                >Explore Features</a
              >
            </div>
          </div>
        </div>

        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class RemoteEntry {}
