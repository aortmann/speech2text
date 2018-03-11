return the transcription of an opus file

## in .bashrc:

    speech2text() {
	    <speech2text_binary_location> `readlink -f $1
    }
    alias speech2text=speech2text

## usage

speech2text \<file\>