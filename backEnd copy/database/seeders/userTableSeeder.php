<?php


class userTableSeeder extends Seeder
{

public function run()
{
    DB::table('users')->delete();
    User::create(array(
        'name'     => 'Mihai Cojocaru',
        'email'    => 'cojocarumihaicosmin@gmail.com',
        'password' => Hash::make('awesome'),
    ));
}

}
