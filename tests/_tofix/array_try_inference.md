# Preval test case

# try_inference.md

> Array > Try inference
>
> In this case we know for sure that the type of arr is an array. We should support that.

## Input

`````js filename=intro
let arr = undefined;
try {
  arr = $([1,2,3]).slice(0);
} catch {
  arr = [];
}
$(arr.forEach(x => x + 10));
`````


## Settled


`````js filename=intro
let arr /*:unknown*/ = undefined;
try {
  const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2, 3];
  const tmpMCOO /*:unknown*/ = $(tmpCalleeParam);
  const tmpMCF /*:unknown*/ = tmpMCOO.slice;
  arr = $dotCall(tmpMCF, tmpMCOO, `slice`, 0);
} catch (e) {
  arr = [];
}
const tmpMCF$1 /*:unknown*/ = arr.forEach;
const tmpMCP /*:(unknown)=>primitive*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg /*:primitive*/ = x + 10;
  return tmpReturnArg;
};
const tmpCalleeParam$1 /*:unknown*/ = $dotCall(tmpMCF$1, arr, `forEach`, tmpMCP);
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let arr = undefined;
try {
  const tmpMCOO = $([1, 2, 3]);
  arr = tmpMCOO.slice(0);
} catch (e) {
  arr = [];
}
const tmpMCF$1 = arr.forEach;
$(
  $dotCall(tmpMCF$1, arr, `forEach`, function (x) {
    const tmpReturnArg = x + 10;
    return tmpReturnArg;
  }),
);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
try {
  const b = [ 1, 2, 3 ];
  const c = $( b );
  const d = c.slice;
  a = $dotCall( d, c, "slice", 0 );
}
catch (e) {
  a = [];
}
const f = a.forEach;
const g = function($$0 ) {
  const h = $$0;
  debugger;
  const i = h + 10;
  return i;
};
const j = $dotCall( f, a, "forEach", g );
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = undefined;
try {
  let tmpCalleeParam = [1, 2, 3];
  const tmpMCOO = $(tmpCalleeParam);
  const tmpMCF = tmpMCOO.slice;
  arr = $dotCall(tmpMCF, tmpMCOO, `slice`, 0);
} catch (e) {
  arr = [];
}
const tmpMCF$1 = arr.forEach;
const tmpMCP = function ($$0) {
  let x = $$0;
  debugger;
  const tmpReturnArg = x + 10;
  return tmpReturnArg;
};
let tmpCalleeParam$1 = $dotCall(tmpMCF$1, arr, `forEach`, tmpMCP);
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? ArrayExpression
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
