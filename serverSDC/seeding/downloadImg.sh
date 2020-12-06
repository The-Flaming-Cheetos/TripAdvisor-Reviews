#!/bin/bash

# bulk download random images with predefined keywords and size from loremflickr.com to current directory

# config
KEYWORDS="hill"   # search keywords comma separated
WIDTH=800               # image width
HEIGHT=600              # image high
COUNT=100                 # image count
MAXTRIALS=3             # max errors until stop

i=0
k=0
while [ $i -lt $COUNT ]
do
    wget "https://loremflickr.com/g/${WIDTH}/${HEIGHT}/${KEYWORDS}/all" -O "${i}.jpg" # loremflickr.com returns random image
    if [ "$?" -ne 0 ]; then
        k=$[$k+1]
        if [ "$k" == "$MAXTRIALS" ]; then
            echo "too many errors. abort..."
            exit 1
        fi
        continue;
    fi
    k=0
    i=$[$i+1]
    sleep 0.5 # wait after each request, do not send too many in short time
done 
