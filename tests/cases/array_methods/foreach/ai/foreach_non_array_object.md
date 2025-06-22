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
const tmpMCP /*:object*/ /*truthy*/ = { [0]: `a`, [1]: `b`, length: 2 };
const tmpLambdaForeachCounterHas /*:boolean*/ = 0 in tmpMCP;
if (tmpLambdaForeachCounterHas) {
  const tmpLambdaForeachCounterVal /*:unknown*/ = tmpMCP[0];
  $(tmpLambdaForeachCounterVal);
} else {
}
const tmpLambdaForeachCounterHas$1 /*:boolean*/ = 1 in tmpMCP;
if (tmpLambdaForeachCounterHas$1) {
  const tmpLambdaForeachCounterVal$1 /*:unknown*/ = tmpMCP[1];
  $(tmpLambdaForeachCounterVal$1);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP = { [0]: `a`, [1]: `b`, length: 2 };
if (0 in tmpMCP) {
  $(tmpMCP[0]);
}
if (1 in tmpMCP) {
  $(tmpMCP[1]);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  [ 0 ]: "a",
  [ 1 ]: "b",
  length: 2,
};
const b = 0 in a;
if (b) {
  const c = a[ 0 ];
  $( c );
}
const d = 1 in a;
if (d) {
  const e = a[ 1 ];
  $( e );
}
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


- (todo) objects in isFree check


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
