# Preval test case

# find_falsy.md

> Array methods > Find > Ai > Find falsy
>
> Test: Array.find with falsy values

## Input

`````js filename=intro
const arr = $([0, '', false, null, undefined, NaN]);
const result = arr.find(x => x === 0);
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [0, ``, false, null, undefined, NaN];
const arr /*:unknown*/ = $(tmpCalleeParam);
const tmpMCF /*:unknown*/ = arr.find;
const tmpMCP /*:(unknown)=>boolean*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg /*:boolean*/ = x === 0;
  return tmpReturnArg;
};
const result /*:unknown*/ = $dotCall(tmpMCF, arr, `find`, tmpMCP);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([0, ``, false, null, undefined, NaN]);
const tmpMCF = arr.find;
$(
  $dotCall(tmpMCF, arr, `find`, function (x) {
    const tmpReturnArg = x === 0;
    return tmpReturnArg;
  }),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 0, "", false, null, undefined, NaN ];
const b = $( a );
const c = b.find;
const d = function($$0 ) {
  const e = $$0;
  debugger;
  const f = e === 0;
  return f;
};
const g = $dotCall( c, b, "find", d );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [0, ``, false, null, undefined, NaN];
const arr = $(tmpCalleeParam);
const tmpMCF = arr.find;
const tmpMCP = function ($$0) {
  let x = $$0;
  debugger;
  const tmpReturnArg = x === 0;
  return tmpReturnArg;
};
const result = $dotCall(tmpMCF, arr, `find`, tmpMCP);
$(result);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [0, '', false, null, undefined, NaN]
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
