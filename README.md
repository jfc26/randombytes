# randombytes


## Install

```cmd
npm install -g zitska-randombytes
```


```cmd
node build/index.js --help

Usage: randombytes [options] <size>

Random Bytes

Arguments:
  size                 The number of bytes to generate. The size must not be larger than 2**31 - 1

Options:
  -V, --version        output the version number
  --encoding [string]  [ascii, utf8, utf-8, utf16le, ucs2, ucs-2, base64, base64url, latin1, binary, hex]
  --debug
  -h, --help           display help for command

```


## How to use

```cmd
node build/index.js 16 

7484f69f4a5968aed6e652225360c98f
```