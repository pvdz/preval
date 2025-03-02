# Preval test case

# i_want_to_be_free.md

> Tofix > i want to be free
>
> Doing base64 decoding with Buffer

existing test

When we detect a function to be free, can we change it to a $free and detect
it as automatically resolving any call that applies primitives to it? etc?

## Input

`````js filename=intro
let unknown = $(1);
function f(x) {
  unknown = x; // This was found in the real world case and deterred the trick
  Buffer; // This was the original case
  const tmp = Buffer.from(x, `base64`);
  const tmp2 = tmp.toString(`utf8`);
  return tmp2;
};
$(f); // Do not inline the func
$(f("cGF0aA")); // path
$(unknown);
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
let unknown = $(1);
$(f);
$(f(`cGF0aA`));
$(unknown);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  unknown = x;
  const tmp = $Buffer_from(x, `base64`);
  const tmp2 = tmp.toString(`utf8`);
  return tmp2;
};
let unknown = $(1);
$(f);
const tmpCallCallee = $;
const tmpCalleeParam = f(`cGF0aA`);
tmpCallCallee(tmpCalleeParam);
$(unknown);
`````

## Output


`````js filename=intro
const f /*:(unknown)=>string*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  unknown = x;
  const tmp /*:buffer*/ = $Buffer_from(x, `base64`);
  const tmp2 /*:string*/ = tmp.toString(`utf8`);
  return tmp2;
};
let unknown /*:unknown*/ = $(1);
$(f);
unknown = `cGF0aA`;
$(`path`);
$(unknown);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  c = b;
  const d = $Buffer_from( b, "base64" );
  const e = d.toString( "utf8" );
  return e;
};
let c = $( 1 );
$( a );
c = "cGF0aA";
$( "path" );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: '<function>'
 - 3: 'path'
 - 4: 'cGF0aA'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
