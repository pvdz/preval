# Preval test case

# chained.md

> Buffer base64 > Chained
>
> Doing base64 decoding with Buffer

## Input

`````js filename=intro
function f(x) {
  return Buffer.from(x, `base64`).toString(`utf8`);
};
$(f); // Do not inline the func
$(f("cGF0aA")); // path
`````

## Settled


`````js filename=intro
const f /*:(unknown)=>string*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  const tmpCallObj /*:buffer*/ = $Buffer_from(x, `base64`);
  const tmpReturnArg /*:string*/ = tmpCallObj.toString(`utf8`);
  return tmpReturnArg;
};
$(f);
$(`path`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function (x) {
  const tmpReturnArg = $Buffer_from(x, `base64`).toString(`utf8`);
  return tmpReturnArg;
});
$(`path`);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  return Buffer.from(x, `base64`).toString(`utf8`);
};
$(f);
$(f(`cGF0aA`));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  const tmpCallObj = $Buffer_from(x, `base64`);
  const tmpReturnArg = tmpCallObj.toString(`utf8`);
  return tmpReturnArg;
};
$(f);
const tmpCalleeParam = f(`cGF0aA`);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = $Buffer_from( b, "base64" );
  const d = c.toString( "utf8" );
  return d;
};
$( a );
$( "path" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - 2: 'path'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $Buffer_from