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
  const tmpMCOO /*:buffer*/ /*truthy*/ = $Buffer_from(x, `base64`);
  const tmpReturnArg /*:string*/ = $dotCall($buffer_toString, tmpMCOO, `toString`, `utf8`);
  return tmpReturnArg;
};
$(f);
$(`path`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function (x) {
  const tmpReturnArg = $dotCall($buffer_toString, $Buffer_from(x, `base64`), `toString`, `utf8`);
  return tmpReturnArg;
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
  const d = $dotCall( $buffer_toString, c, "toString", "utf8" );
  return d;
};
$( a );
$( "path" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  const tmpMCF = $Buffer_from;
  const tmpMCOO = $Buffer_from(x, `base64`);
  const tmpMCF$1 = tmpMCOO.toString;
  const tmpReturnArg = $dotCall(tmpMCF$1, tmpMCOO, `toString`, `utf8`);
  return tmpReturnArg;
};
$(f);
let tmpCalleeParam = f(`cGF0aA`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $buffer_toString
- (todo) type trackeed tricks can possibly support static $Buffer_from


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
