
require 'sass-globbing'
require 'breakpoint'

environment = :development
css_dir = "css"
sass_dir = "sass"
output_style = (environment == :production) ? :expanded : :nested
line_comments = (environment == :production) ? false : true
sass_options = (environment == :production) ? {} : {:debug_info => true}
add_import_path 'sass'
