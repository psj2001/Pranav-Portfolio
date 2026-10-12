<?php
/**
 * Copy this file to config.php and fill in the Hostinger MySQL details.
 * Prefer placing config.php one level above public_html so it is not on the web.
 * The API also accepts php-api/config.php if that is where you upload it.
 *
 * Create the password hash on your computer:
 * php -r "echo password_hash('your-password', PASSWORD_DEFAULT), PHP_EOL;"
 */
return [
    'db_host' => 'localhost',
    'db_name' => 'your_database_name',
    'db_user' => 'your_database_user',
    'db_pass' => 'your_database_password',
    'admin_password_hash' => '',
];
