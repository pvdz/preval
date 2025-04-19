# Preval test case

# base.md

> Buffer base64 > Base
>
> Doing base64 decoding with Buffer

## Input

`````js filename=intro
function f(x) {
  const tmp = Buffer.from(x, `base64`);
  const tmp2 = tmp.toString(`utf8`);
  return tmp2;
};
$(f); // Do not inline the func
$(f ("cGF0aA")); // path
`````


## Settled


`````js filename=intro
const f /*:(unknown)=>unknown*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  const tmp /*:buffer*/ = $dotCall($Buffer_from, Buffer, `from`, x, `base64`);
  const tmpCallCompVal$1 /*:unknown*/ = tmp.toString;
  const tmp2 /*:unknown*/ = $dotCall(tmpCallCompVal$1, tmp, `toString`, `utf8`);
  return tmp2;
};
$(f);
$(`path`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function (x) {
  const tmp = $dotCall($Buffer_from, Buffer, `from`, x, `base64`);
  const tmp2 = tmp.toString(`utf8`);
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
  const c = $dotCall( $Buffer_from, Buffer, "from", b, "base64" );
  const d = c.toString;
  const e = $dotCall( d, c, "toString", "utf8" );
  return e;
};
$( a );
$( "path" );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Buffer_from
- (todo) access object property that also exists on prototype? $buffer_toString
- (todo) these should be eliminated by eliminating builtin-globals-as-statements in normalize


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
