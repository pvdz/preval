# Preval test case

# with_ident.md

> Buffer base64 > With ident
>
> Doing base64 decoding with Buffer

## Input

`````js filename=intro
function f(x) {
  debugger;
  Buffer; // This was the original case
  const tmp = Buffer.from(x, `base64`);
  const tmp2 = tmp.toString(`utf8`);
  return tmp2;
};
$(f); // Do not inline the func
$(f("cGF0aA")); // path
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  Buffer;
  const tmp = Buffer.from(x, `base64`);
  const tmp2 = tmp.toString(`utf8`);
  return tmp2;
};
$(f);
$(f(`cGF0aA`));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  const tmp = Buffer.from(x, `base64`);
  const tmp2 = tmp.toString(`utf8`);
  return tmp2;
};
$(f);
const tmpCallCallee = $;
const tmpCalleeParam = f(`cGF0aA`);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const f /*:(unknown)=>?*/ = function ($$0) {
  const x = $$0;
  debugger;
  const tmp = Buffer.from(x, `base64`);
  const tmp2 = tmp.toString(`utf8`);
  return tmp2;
};
$(f);
$(`path`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = Buffer.from( b, "base64" );
  const d = c.toString( "utf8" );
  return d;
};
$( a );
$( "path" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: 'path'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
