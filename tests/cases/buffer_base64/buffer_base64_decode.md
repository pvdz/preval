# Preval test case

# buffer_base64_decode.md

> Buffer base64 > Buffer base64 decode
>
> Found in a deobfuscator. With a slightly different payload.

## Input

`````js filename=intro
const decodebase64 = function(arg) {
  const buf = Buffer.from(arg, `base64`);
  const str = buf.toString(`ascii`);
  return str;
};
const x = decodebase64(`aGVsbG8sIHdvcmxk=`);
$(x); // hello, world
`````

## Pre Normal


`````js filename=intro
const decodebase64 = function ($$0) {
  let arg = $$0;
  debugger;
  const buf = Buffer.from(arg, `base64`);
  const str = buf.toString(`ascii`);
  return str;
};
const x = decodebase64(`aGVsbG8sIHdvcmxk=`);
$(x);
`````

## Normalized


`````js filename=intro
const decodebase64 = function ($$0) {
  let arg = $$0;
  debugger;
  const buf = Buffer.from(arg, `base64`);
  const str = buf.toString(`ascii`);
  return str;
};
const x = decodebase64(`aGVsbG8sIHdvcmxk=`);
$(x);
`````

## Output


`````js filename=intro
$(`hello, world`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "hello, world" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'hello, world'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
