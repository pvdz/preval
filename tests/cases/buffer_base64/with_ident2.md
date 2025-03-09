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

## Settled


`````js filename=intro
const f /*:(unknown)=>string*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  unknown = x;
  const tmp /*:buffer*/ = $Buffer_from(x, `base64`);
  const tmp2 /*:string*/ = tmp.toString(`utf8`);
  return tmp2;
};
$(f);
unknown = `cGF0aA`;
unknown = `cGF0aA`;
$(`path`);
unknown = `cGF0aA`;
unknown = `cGF0aA`;
$(`path`);
unknown = `cGF0aA`;
unknown = `cGF0aA`;
$(`path`);
$(`path`);
$(`path`);
$(`path`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function (x) {
  unknown = x;
  const tmp2 = $Buffer_from(x, `base64`).toString(`utf8`);
  return tmp2;
});
unknown = `cGF0aA`;
unknown = `cGF0aA`;
$(`path`);
unknown = `cGF0aA`;
unknown = `cGF0aA`;
$(`path`);
unknown = `cGF0aA`;
unknown = `cGF0aA`;
$(`path`);
$(`path`);
$(`path`);
$(`path`);
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
  const tmp = $Buffer_from(x, `base64`);
  const tmp2 = tmp.toString(`utf8`);
  return tmp2;
};
$(f);
const tmpCalleeParam = f(`cGF0aA`);
$(tmpCalleeParam);
const tmpCalleeParam$1 = f(`cGF0aA`);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = f(`cGF0aA`);
$(tmpCalleeParam$3);
const tmpCalleeParam$5 = f(`cGF0aA`);
$(tmpCalleeParam$5);
const tmpCalleeParam$7 = f(`cGF0aA`);
$(tmpCalleeParam$7);
const tmpCalleeParam$9 = f(`cGF0aA`);
$(tmpCalleeParam$9);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  unknown = b;
  const c = $Buffer_from( b, "base64" );
  const d = c.toString( "utf8" );
  return d;
};
$( a );
unknown = "cGF0aA";
unknown = "cGF0aA";
$( "path" );
unknown = "cGF0aA";
unknown = "cGF0aA";
$( "path" );
unknown = "cGF0aA";
unknown = "cGF0aA";
$( "path" );
$( "path" );
$( "path" );
$( "path" );
`````

## Globals

BAD@! Found 1 implicit global bindings:

unknown

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $Buffer_from
