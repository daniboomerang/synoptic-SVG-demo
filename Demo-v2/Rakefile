require 'rubygems'
require 'rspec/core/rake_task'
require 'cucumber'
require 'cucumber/rake/task'
require 'listen'
require 'yaml'

require_relative 'test/support/fixtures'

desc "Run server"

task :serverup do
  system "rackup -p 3000 &"
end

task :serverdown do
  system "pkill -9 -f rackup"
end

namespace :test do

  desc "Run lib tests"
  RSpec::Core::RakeTask.new(:lib) do |t|
      t.pattern = "test/lib/*.rb"
      t.rspec_opts = " -c --format documentation"
  end

  desc "Run domain tests"
  RSpec::Core::RakeTask.new(:domain) do |t|
      t.pattern = FileList['*/test/domain/*.rb', 'test/domain/*.rb']
      t.rspec_opts = " -c --format documentation"
  end

  desc "Run integration rspec tests"
  RSpec::Core::RakeTask.new(:rspecintegration) do |t|
      t.pattern = FileList['*/test/integration/*.rb', 'test/integration/*.rb']
      t.rspec_opts = " -c --format documentation"
  end

  desc "Run all tests"
  task :all do
    Rake::Task['test:lib'].execute
    Rake::Task['test:domain'].execute
    Rake::Task['test:routes'].execute
    Rake::Task['test:integration'].execute
  end

  task :integration do
    Rake::Task['test:rspecintegration'].execute
  end

  desc "Run routes tests"
  RSpec::Core::RakeTask.new(:routes) do |t|
      t.pattern = "test/routes/*.rb"
      t.rspec_opts = " -c --format documentation"
  end

  desc "Run rspec acceptance tests"
  RSpec::Core::RakeTask.new(:acceptance) do |t|
      t.pattern = "test/acceptance/*.rb"
      t.rspec_opts = " -c --format documentation"
  end

  desc "Run rspec acceptance wip tests"
  RSpec::Core::RakeTask.new(:acceptance_wip) do |t|
      t.pattern = "test/acceptance/*.rb"
      t.rspec_opts = " -c --format documentation --tag wip"
  end

  desc "Run rspec integration wip tests"
  RSpec::Core::RakeTask.new(:integration_wip) do |t|
      t.pattern = "test/integration/*.rb"
      t.rspec_opts = " -c --format documentation --tag wip"
  end

end
