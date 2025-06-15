# Preval test case

# find_undefined.md

> Array methods > FindIndex > Ai > Find undefined
>
> Test: Array.findIndex with undefined elements

## Input

`````js filename=intro
const arr = $([undefined, null, 0, '', false]);
const result = arr.findIndex(x => x === undefined);
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [undefined, null, 0, ``, false];
const arr /*:unknown*/ = $(tmpCalleeParam);
const tmpMCF /*:unknown*/ = arr.findIndex;
const tmpMCP /*:(unknown)=>boolean*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg /*:boolean*/ = x === undefined;
  return tmpReturnArg;
};
const result /*:unknown*/ = $dotCall(tmpMCF, arr, `findIndex`, tmpMCP);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([undefined, null, 0, ``, false]);
const tmpMCF = arr.findIndex;
$(
  $dotCall(tmpMCF, arr, `findIndex`, function (x) {
    const tmpReturnArg = x === undefined;
    return tmpReturnArg;
  }),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ undefined, null, 0, "", false ];
const b = $( a );
const c = b.findIndex;
const d = function($$0 ) {
  const e = $$0;
  debugger;
  const f = e === undefined;
  return f;
};
const g = $dotCall( c, b, "findIndex", d );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [undefined, null, 0, ``, false];
const arr = $(tmpCalleeParam);
const tmpMCF = arr.findIndex;
const tmpMCP = function ($$0) {
  let x = $$0;
  debugger;
  const tmpReturnArg = x === undefined;
  return tmpReturnArg;
};
const result = $dotCall(tmpMCF, arr, `findIndex`, tmpMCP);
$(result);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [undefined, null, 0, '', false]
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
