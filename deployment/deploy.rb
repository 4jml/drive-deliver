# config valid only for Capistrano 3.1
# lock '3.1.0'

set :application, '4JMLDriveDeliver'

set :format, :pretty
set :log_level, :info
set :keep_releases, 2
set :pty, true

set :linked_files, %w{conf.js}
set :linked_dirs, %w{}

before 'deploy:starting', 'radian:parameters'
before 'deploy:publishing', 'npm:build'
after 'deploy:finishing', 'deploy:cleanup'