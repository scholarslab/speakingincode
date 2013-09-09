require 'yaml'
require 'pdfkit'

task :default => :server

desc "Clean up generated site"
task :clean do
  cleanup
end

desc "Build site with Jekyll"
task :build => :clean do
  compass '', false
  jekyll
end

desc 'Start server with --auto'
task :server => :clean do
  compass
  jekyll('serve --watch')
end

desc "Draft a new post"
task :draft, :title do |t, args|
  require './_plugins/titlecase.rb'
  args.with_defaults(:title => 'new-post')

  title = args.title.gsub(/&/,'&amp;').titlecase
  draft("#{title}")
end

desc "Publish a Draft"
task :publish, :filename do |t, args|
  args.with_defaults(:filename => nil)
  filename = args.filename
  publish(filename)
end

def cleanup
  sh 'rm -rf _site'
end

def jekyll(opts = '')
  sh 'bundle exec jekyll ' + opts
end

def compass(opts = '', watch=true)
  cmd = 'compass compile -c config.rb --force ' + opts
  cmd += ' && compass watch &' if watch
  sh cmd
end

def draft(title)
  slug = title.downcase.gsub(/ +/,'-').gsub(/[^-\w]/,'').sub(/-+$/,'')
  filename = slug + ".md"
  FileUtils.mkdir_p "_drafts"
  if File.exists?("_drafts/#{filename}")
    puts "#{filename} already exists!"
    return
  end
  File.open("_drafts/#{filename}","w+") do |f|
    f.puts "---"
    f.puts "layout: post"
    f.puts "title: #{title}"
    f.puts "---"
  end
  puts "Created _drafts/#{filename}"
end

def publish(file=nil)
  unless file
    puts "Choose file:"
    @files = Dir["_drafts/*"]
    @files.each_with_index { |f,i| puts "#{i+1}: #{f}" }
    print "> "
    num = STDIN.gets
    file = @files[num.to_i - 1]
  end
  now = Time.now.strftime("%Y-%m-%d")
  mv file, "_posts/#{now}-#{File.basename(file)}"
end
