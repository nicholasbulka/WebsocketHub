var args = process.argv.slice(2);


process.kill(args[0], 'SIGTERM')
