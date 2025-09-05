# File Tree: Laravel-Vanilla_JS-Task_Manager

Generated on: 06/09/2025 00:31:29
Root path: `/home/student/Bureau/html/Post-Formation/Laravel-Vanilla_JS-Task_Manager`

```md
├── 📁 .git/ 🚫 (auto-hidden)
├── 📁 .vscode/ 🚫 (auto-hidden)
├── 📁 backend/
│   ├── 📁 .vscode/ 🚫 (auto-hidden)
│   ├── 📁 app/
│   │   ├── 📁 Console/
│   │   │   └── 🐘 Kernel.php
│   │   ├── 📁 Exceptions/
│   │   │   └── 🐘 Handler.php
│   │   ├── 📁 Http/
│   │   │   ├── 📁 Controllers/
│   │   │   │   ├── 🐘 CategoryController.php
│   │   │   │   ├── 🐘 Controller.php
│   │   │   │   ├── 🐘 TagController.php
│   │   │   │   └── 🐘 TaskController.php
│   │   │   ├── 📁 Middleware/
│   │   │   │   ├── 🐘 Authenticate.php
│   │   │   │   ├── 🐘 EncryptCookies.php
│   │   │   │   ├── 🐘 PreventRequestsDuringMaintenance.php
│   │   │   │   ├── 🐘 RedirectIfAuthenticated.php
│   │   │   │   ├── 🐘 TrimStrings.php
│   │   │   │   ├── 🐘 TrustHosts.php
│   │   │   │   ├── 🐘 TrustProxies.php
│   │   │   │   └── 🐘 VerifyCsrfToken.php
│   │   │   └── 🐘 Kernel.php
│   │   ├── 📁 Models/
│   │   │   ├── 🐘 Category.php
│   │   │   ├── 🐘 Tag.php
│   │   │   ├── 🐘 Task.php
│   │   │   └── 🐘 User.php
│   │   └── 📁 Providers/
│   │       ├── 🐘 AppServiceProvider.php
│   │       ├── 🐘 AuthServiceProvider.php
│   │       ├── 🐘 BroadcastServiceProvider.php
│   │       ├── 🐘 EventServiceProvider.php
│   │       └── 🐘 RouteServiceProvider.php
│   ├── 📁 bootstrap/
│   │   ├── 📁 cache/ 🚫 (auto-hidden)
│   │   └── 🐘 app.php
│   ├── 📁 config/
│   │   ├── 🐘 app.php
│   │   ├── 🐘 auth.php
│   │   ├── 🐘 broadcasting.php
│   │   ├── 🐘 cache.php
│   │   ├── 🐘 cors.php
│   │   ├── 🐘 database.php
│   │   ├── 🐘 filesystems.php
│   │   ├── 🐘 hashing.php
│   │   ├── 🐘 logging.php
│   │   ├── 🐘 mail.php
│   │   ├── 🐘 queue.php
│   │   ├── 🐘 sanctum.php
│   │   ├── 🐘 services.php
│   │   ├── 🐘 session.php
│   │   └── 🐘 view.php
│   ├── 📁 database/
│   │   ├── 📁 factories/
│   │   │   └── 🐘 UserFactory.php
│   │   ├── 📁 migrations/
│   │   │   ├── 🐘 2014_10_12_000000_create_users_table.php
│   │   │   ├── 🐘 2014_10_12_100000_create_password_resets_table.php
│   │   │   ├── 🐘 2019_08_19_000000_create_failed_jobs_table.php
│   │   │   └── 🐘 2019_12_14_000001_create_personal_access_tokens_table.php
│   │   ├── 📁 seeders/
│   │   │   └── 🐘 DatabaseSeeder.php
│   │   └── 🚫 .gitignore
│   ├── 📁 public/
│   │   ├── 📄 .htaccess
│   │   ├── 🖼️ favicon.ico
│   │   ├── 🐘 index.php
│   │   └── 📄 robots.txt
│   ├── 📁 resources/
│   │   ├── 📁 css/
│   │   │   └── 🎨 app.css
│   │   ├── 📁 js/
│   │   │   ├── 📄 app.js
│   │   │   └── 📄 bootstrap.js
│   │   ├── 📁 lang/
│   │   │   └── 📁 en/
│   │   │       ├── 🐘 auth.php
│   │   │       ├── 🐘 pagination.php
│   │   │       ├── 🐘 passwords.php
│   │   │       └── 🐘 validation.php
│   │   └── 📁 views/
│   │       └── 🐘 welcome.blade.php
│   ├── 📁 routes/
│   │   ├── 🐘 api.php
│   │   ├── 🐘 channels.php
│   │   ├── 🐘 console.php
│   │   └── 🐘 web.php
│   ├── 📁 storage/
│   │   ├── 📁 app/
│   │   │   ├── 📁 public/
│   │   │   │   └── 🚫 .gitignore
│   │   │   └── 🚫 .gitignore
│   │   ├── 📁 framework/
│   │   │   ├── 📁 cache/ 🚫 (auto-hidden)
│   │   │   ├── 📁 sessions/
│   │   │   │   └── 🚫 .gitignore
│   │   │   ├── 📁 testing/
│   │   │   │   └── 🚫 .gitignore
│   │   │   ├── 📁 views/
│   │   │   │   ├── 🚫 .gitignore
│   │   │   │   ├── 🐘 3ad536ad87308cd69bd7467a4bd08772a07fe570.php
│   │   │   │   └── 🐘 4c213740f3602ffe0fdadfba160441863da044fb.php
│   │   │   └── 🚫 .gitignore
│   │   └── 📁 logs/
│   │       ├── 🚫 .gitignore
│   │       └── 📋 laravel.log 🚫 (auto-hidden)
│   ├── 📁 tests/
│   │   ├── 📁 Feature/
│   │   │   └── 🐘 ExampleTest.php
│   │   ├── 📁 Unit/
│   │   │   └── 🐘 ExampleTest.php
│   │   ├── 🐘 CreatesApplication.php
│   │   └── 🐘 TestCase.php
│   ├── 📁 vendor/
│   │   └── 🚫 (auto-hidden)
│   ├── 📄 .editorconfig
│   ├── 🔒 .env 🚫 (auto-hidden)
│   ├── 📄 .env.example
│   ├── 📄 .gitattributes
│   ├── 🚫 .gitignore
│   ├── ⚙️ .styleci.yml
│   ├── 📖 README.md
│   ├── 📄 artisan
│   ├── 📄 composer.json
│   ├── 🔒 composer.lock 🚫 (auto-hidden)
│   ├── 📄 package.json
│   ├── 📄 phpunit.xml
│   ├── 🐘 server.php
│   └── 📄 webpack.mix.js
├── 📁 docs/
│   └──  📁 tests-api/
│       ├── 📄 category-create.http
│       ├── 📄 category-delete.http
│       ├── 📄 category-list.http
│       ├── 📄 category-update.http
│       ├── 📄 read.http
│       ├── 📄 tag-create.http
│       ├── 📄 tag-delete.http
│       ├── 📄 tag-list.http
│       ├── 📄 tag-update.http
│       ├── 📄 task-create.http
│       ├── 📄 task-delete.http
│       ├── 📄 task-list.http
│       └── 📄 task-update.http
├── 📁 frontend/
│   ├── 📁 .vscode/ 🚫 (auto-hidden)
│   ├── 📁 css/
│   │   └── 🎨 style.css
│   ├── 📁 docs/
│   │   └── 📁 maquette/
│   │       ├── 📕 home_00.pdf
│   │       ├── 📕 home_01_form.pdf
│   │       └── 📕 home_02_message.pdf
│   ├── 📁 img/
│   │   ├── 🖼️ delete.png
│   │   └── 🖼️ edit.png
│   ├── 📁 js/
│   │   ├── 📄 app.js
│   │   ├── 📄 category-list.js
│   │   ├── 📄 taskCreate.js
│   │   ├── 📄 taskDelete.js
│   │   ├── 📄 taskList.js
│   │   └── 📄 taskUpdate.js
│   ├── 📄 .gitkeep
│   ├── 📖 README.md
│   └── 🌐 index.html
└── 📖 README.md
```

---
*Generated by FileTree Pro Extension*