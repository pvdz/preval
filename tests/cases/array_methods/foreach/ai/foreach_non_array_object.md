# Preval test case

# foreach_non_array_object.md

> Array methods > Foreach > Ai > Foreach non array object
>
> Test: Array.forEach on array-like object

## Input

`````js filename=intro
// Input: Array.prototype.forEach.call({0:'a',1:'b',length:2}, fn)
// Expected: fn called for each property
Array.prototype.forEach.call({0:'a',1:'b',length:2}, function(x) { $(x); });
`````


## Settled


`````js filename=intro
const tmpMCP$1 /*:(unknown)=>undefined*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  $(x);
  return undefined;
};
const tmpMCP /*:object*/ /*truthy*/ = { [0]: `a`, [1]: `b`, length: 2 };
$dotCall($array_forEach, tmpMCP, undefined, tmpMCP$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP$1 = function (x) {
  $(x);
};
$dotCall($array_forEach, { [0]: `a`, [1]: `b`, length: 2 }, undefined, tmpMCP$1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  $( b );
  return undefined;
};
const c = {
  [ 0 ]: "a",
  [ 1 ]: "b",
  length: 2,
};
$dotCall( $array_forEach, c, undefined, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $Array_prototype;
const tmpMCOO = tmpCompObj.forEach;
const tmpMCF = tmpMCOO.call;
const tmpMCP = { [0]: `a`, [1]: `b`, length: 2 };
const tmpMCP$1 = function ($$0) {
  let x = $$0;
  debugger;
  $(x);
  return undefined;
};
$dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, tmpMCP$1);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $array_forEach


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
