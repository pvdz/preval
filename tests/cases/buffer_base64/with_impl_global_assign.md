# Preval test case

# with_impl_global_assign.md

> Buffer base64 > With impl global assign
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


## Settled


`````js filename=intro
const f /*:(unknown)=>string*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  unknown = x;
  const tmp /*:buffer*/ /*truthy*/ = $Buffer_from(x, `base64`);
  const tmp2 /*:string*/ = $dotCall($buffer_toString, tmp, `toString`, `utf8`);
  return tmp2;
};
$(f);
unknown = `cGF0aA`;
$(`path`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function (x) {
  unknown = x;
  const tmp2 = $dotCall($buffer_toString, $Buffer_from(x, `base64`), `toString`, `utf8`);
  return tmp2;
});
unknown = `cGF0aA`;
$(`path`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  unknown = b;
  const c = $Buffer_from( b, "base64" );
  const d = $dotCall( $buffer_toString, c, "toString", "utf8" );
  return d;
};
$( a );
unknown = "cGF0aA";
$( "path" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  unknown = x;
  const tmpMCF = $Buffer_from;
  const tmp = $Buffer_from(x, `base64`);
  const tmpMCF$1 = tmp.toString;
  const tmp2 = $dotCall(tmpMCF$1, tmp, `toString`, `utf8`);
  return tmp2;
};
$(f);
let tmpCalleeParam = f(`cGF0aA`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $buffer_toString
- (todo) type trackeed tricks can possibly support static $Buffer_from


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
