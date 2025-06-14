# Preval test case

# reduce_empty_no_init.md

> Array methods > Reduceright > Ai > Reduce empty no init
>
> Test: Array.reduceRight with empty array without initial value (should throw)

## Input

`````js filename=intro
const arr = $([]);
try {
    arr.reduceRight((acc, val) => acc + val);
} catch (e) {
    $(e.name);  // Should be TypeError
}
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [];
const arr /*:unknown*/ = $(tmpCalleeParam);
try {
  const tmpMCF /*:unknown*/ = arr.reduceRight;
  const tmpMCP /*:(unknown, unknown)=>primitive*/ = function ($$0, $$1) {
    const acc /*:unknown*/ = $$0;
    const val /*:unknown*/ = $$1;
    debugger;
    const tmpReturnArg /*:primitive*/ = acc + val;
    return tmpReturnArg;
  };
  $dotCall(tmpMCF, arr, `reduceRight`, tmpMCP);
} catch (e) {
  const tmpCalleeParam$1 /*:unknown*/ = e.name;
  $(tmpCalleeParam$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([]);
try {
  arr.reduceRight(function (acc, val) {
    const tmpReturnArg = acc + val;
    return tmpReturnArg;
  });
} catch (e) {
  $(e.name);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $( a );
try {
  const c = b.reduceRight;
  const d = function($$0,$$1 ) {
    const e = $$0;
    const f = $$1;
    debugger;
    const g = e + f;
    return g;
  };
  $dotCall( c, b, "reduceRight", d );
}
catch (h) {
  const i = h.name;
  $( i );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [];
const arr = $(tmpCalleeParam);
try {
  const tmpMCF = arr.reduceRight;
  const tmpMCP = function ($$0, $$1) {
    let acc = $$0;
    let val = $$1;
    debugger;
    const tmpReturnArg = acc + val;
    return tmpReturnArg;
  };
  $dotCall(tmpMCF, arr, `reduceRight`, tmpMCP);
} catch (e) {
  let tmpCalleeParam$1 = e.name;
  $(tmpCalleeParam$1);
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? MemberExpression
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: []
 - 2: 'TypeError'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
