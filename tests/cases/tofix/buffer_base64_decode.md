# Preval test case

# buffer_base64_decode.md

> Tofix > Buffer base64 decode
>
> Found in a deobfuscator. With a slightly different payload.

## Input

`````js filename=intro
const decodebase64 = function(arg) {
  const tmpCallCompObj$3 = Buffer.from(arg, `base64`);
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
  const tmpCallCompObj$3 = Buffer.from(arg, `base64`);
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
  const tmpCallCompObj$3 = Buffer.from(arg, `base64`);
  const str = buf.toString(`ascii`);
  return str;
};
const x = decodebase64(`aGVsbG8sIHdvcmxk=`);
$(x);
`````

## Output


`````js filename=intro
Buffer.from(`aGVsbG8sIHdvcmxk=`, `base64`);
const str = buf.toString(`ascii`);
$(str);
`````

## PST Output

With rename=true

`````js filename=intro
Buffer.from( "aGVsbG8sIHdvcmxk=", "base64" );
const a = buf.toString( "ascii" );
$( a );
`````

## Globals

BAD@! Found 2 implicit global bindings:

Buffer, buf

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
