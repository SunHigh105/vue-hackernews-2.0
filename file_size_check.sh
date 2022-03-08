echo "TARGET_FILES=$(find ./public/ -size +5k | sed 's/\.//g')" >> $GITHUB_ENV
