# Preval test case

# find_early_return.md

> Array methods > Find > Ai > Find early return
>
> Test: Array.find early return - should stop after finding first match

## Input

`````js filename=intro
const arr = $([1, 2, 3, 4, 5]);
let count = 0;
const result = arr.find(x => {
    count++;
    return x > 2;  // Should stop after 3
});
$(count);  // Should be 3 (checks 1, 2, 3)
$(result);  // Should be true
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2, 3, 4, 5];
const arr /*:unknown*/ = $(tmpCalleeParam);
let count /*:primitive*/ = 0;
const tmpMCF /*:unknown*/ = arr.find;
const tmpMCP /*:(unknown)=>boolean*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  const tmpPostUpdArgIdent /*:primitive*/ = count;
  count = tmpPostUpdArgIdent + 1;
  const tmpReturnArg /*:boolean*/ = x > 2;
  return tmpReturnArg;
};
const result /*:unknown*/ = $dotCall(tmpMCF, arr, `find`, tmpMCP);
$(count);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([1, 2, 3, 4, 5]);
let count = 0;
const result = arr.find(function (x) {
  count = count + 1;
  const tmpReturnArg = x > 2;
  return tmpReturnArg;
});
$(count);
$(result);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4, 5 ];
const b = $( a );
let c = 0;
const d = b.find;
const e = function($$0 ) {
  const f = $$0;
  debugger;
  const g = c;
  c = g + 1;
  const h = f > 2;
  return h;
};
const i = $dotCall( d, b, "find", e );
$( c );
$( i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [1, 2, 3, 4, 5];
const arr = $(tmpCalleeParam);
let count = 0;
const tmpMCF = arr.find;
const tmpMCP = function ($$0) {
  let x = $$0;
  debugger;
  const tmpPostUpdArgIdent = $coerce(count, `number`);
  count = tmpPostUpdArgIdent + 1;
  const tmpReturnArg = x > 2;
  return tmpReturnArg;
};
const result = $dotCall(tmpMCF, arr, `find`, tmpMCP);
$(count);
$(result);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3, 4, 5]
 - 2: 3
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
