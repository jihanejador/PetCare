<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Category::firstOrCreate(['name' => "Garde d'animaux"]);
        Category::firstOrCreate(['name' => 'Toilettage']);
        Category::firstOrCreate(['name' => 'Éducation & Dressage']);
        Category::firstOrCreate(['name' => 'Vétérinaire']);
    }
}
