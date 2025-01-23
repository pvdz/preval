# Preval test case

# with_global_assign.md

> Buffer base64 > With global assign
>
> Doing base64 decoding with Buffer

## Input

`````js filename=intro
function f(x) {
  unknown = x; // This was found in the real world case and deterred the trick
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
  unknown = x;
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
  unknown = x;
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
  unknown = x;
  const tmp = Buffer.from(x, `base64`);
  const tmp2 = tmp.toString(`utf8`);
  return tmp2;
};
$(f);
const tmpCalleeParam = f(`cGF0aA`);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  unknown = b;
  const d = Buffer.from( b, "base64" );
  const e = d.toString( "utf8" );
  return e;
};
$( a );
const f = a( "cGF0aA" );
$( f );
`````

## Globals

BAD@! Found 1 implicit global bindings:

unknown

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
