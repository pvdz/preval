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


## Settled


`````js filename=intro
const f /*:(unknown)=>string*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  const tmp /*:buffer*/ = $Buffer_from(x, `base64`);
  const tmp2 /*:string*/ = tmp.toString(`utf8`);
  return tmp2;
};
$(f);
$(`path`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function (x) {
  const tmp2 = $Buffer_from(x, `base64`).toString(`utf8`);
  return tmp2;
});
$(`path`);
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


## Todos triggered


- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Buffer_from


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
