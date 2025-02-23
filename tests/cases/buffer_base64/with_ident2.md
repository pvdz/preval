# Preval test case

# with_ident2.md

> Buffer base64 > With ident2
>
> Doing base64 decoding with Buffer
>
> Point here is to see if it will still outline the global assignment when used multiple times

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
$(f("cGF0aA")); // path
$(f("cGF0aA")); // path
$(f("cGF0aA")); // path
$(f("cGF0aA")); // path
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
$(f(`cGF0aA`));
$(f(`cGF0aA`));
$(f(`cGF0aA`));
$(f(`cGF0aA`));
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
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(`cGF0aA`);
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f(`cGF0aA`);
tmpCallCallee$3(tmpCalleeParam$3);
const tmpCallCallee$5 = $;
const tmpCalleeParam$5 = f(`cGF0aA`);
tmpCallCallee$5(tmpCalleeParam$5);
const tmpCallCallee$7 = $;
const tmpCalleeParam$7 = f(`cGF0aA`);
tmpCallCallee$7(tmpCalleeParam$7);
const tmpCallCallee$9 = $;
const tmpCalleeParam$9 = f(`cGF0aA`);
tmpCallCallee$9(tmpCalleeParam$9);
`````

## Output


`````js filename=intro
const f /*:(unknown)=>?*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  unknown = x;
  const tmp /*:unknown*/ = Buffer.from(x, `base64`);
  const tmp2 /*:unknown*/ = tmp.toString(`utf8`);
  return tmp2;
};
$(f);
const tmpCalleeParam /*:unknown*/ = f(`cGF0aA`);
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:unknown*/ = f(`cGF0aA`);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:unknown*/ = f(`cGF0aA`);
$(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:unknown*/ = f(`cGF0aA`);
$(tmpCalleeParam$5);
const tmpCalleeParam$7 /*:unknown*/ = f(`cGF0aA`);
$(tmpCalleeParam$7);
const tmpCalleeParam$9 /*:unknown*/ = f(`cGF0aA`);
$(tmpCalleeParam$9);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  unknown = b;
  const c = Buffer.from( b, "base64" );
  const d = c.toString( "utf8" );
  return d;
};
$( a );
const e = a( "cGF0aA" );
$( e );
const f = a( "cGF0aA" );
$( f );
const g = a( "cGF0aA" );
$( g );
const h = a( "cGF0aA" );
$( h );
const i = a( "cGF0aA" );
$( i );
const j = a( "cGF0aA" );
$( j );
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
