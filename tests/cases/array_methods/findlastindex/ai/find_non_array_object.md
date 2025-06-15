# Preval test case

# find_non_array_object.md

> Array methods > Findlastindex > Ai > Find non array object
>
> Test: Array.findLastIndex on array-like object

## Input

`````js filename=intro
const x = Array.prototype.findLastIndex.call({0:'a',1:'b',length:2}, function(x) { $(x); });
$(x);
`````


## Settled


`````js filename=intro
const tmpMCP$1 /*:(unknown)=>undefined*/ = function ($$0) {
  const x$1 /*:unknown*/ = $$0;
  debugger;
  $(x$1);
  return undefined;
};
const tmpMCP /*:object*/ /*truthy*/ = { [0]: `a`, [1]: `b`, length: 2 };
const x /*:number*/ = $dotCall($array_findLastIndex, tmpMCP, undefined, tmpMCP$1);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP$1 = function (x$1) {
  $(x$1);
};
$($dotCall($array_findLastIndex, { [0]: `a`, [1]: `b`, length: 2 }, undefined, tmpMCP$1));
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
const d = $dotCall( $array_findLastIndex, c, undefined, a );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $Array_prototype;
const tmpMCOO = tmpCompObj.findLastIndex;
const tmpMCF = tmpMCOO.call;
const tmpMCP = { [0]: `a`, [1]: `b`, length: 2 };
const tmpMCP$1 = function ($$0) {
  let x$1 = $$0;
  debugger;
  $(x$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, tmpMCP$1);
$(x);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $array_findLastIndex


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'b'
 - 2: 'a'
 - 3: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
