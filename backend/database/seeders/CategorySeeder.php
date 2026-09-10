<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ["id" => 1, "name" => "Garde d'animaux"],
            ["id" => 2, "name" => "Toilettage"],
            ["id" => 3, "name" => "Éducation & Dressage"],
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(['id' => $cat['id']], $cat);
        }
    }
}
