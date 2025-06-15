# Preval test case

# find_this_arg.md

> Array methods > Find > Ai > Find this arg
>
> Test: Array.find with thisArg parameter

## Input

`````js filename=intro
const arr = $([1, 2, 3]);
const obj = { threshold: 2 };
const result = arr.find(function(x) {
  return x > this.threshold;
}, obj);
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2, 3];
const arr /*:unknown*/ = $(tmpCalleeParam);
const tmpMCF /*:unknown*/ = arr.find;
const tmpMCP /*:(unknown)=>boolean*/ = function ($$0) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  const x /*:unknown*/ = $$0;
  debugger;
  const tmpBinBothRhs /*:unknown*/ = tmpPrevalAliasThis.threshold;
  const tmpReturnArg /*:boolean*/ = x > tmpBinBothRhs;
  return tmpReturnArg;
};
const obj /*:object*/ /*truthy*/ = { threshold: 2 };
const result /*:unknown*/ = $dotCall(tmpMCF, arr, `find`, tmpMCP, obj);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([1, 2, 3]);
const tmpMCF = arr.find;
const tmpMCP = function (x) {
  const tmpPrevalAliasThis = this;
  const tmpReturnArg = x > tmpPrevalAliasThis.threshold;
  return tmpReturnArg;
};
$($dotCall(tmpMCF, arr, `find`, tmpMCP, { threshold: 2 }));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = $( a );
const c = b.find;
const d = function($$0 ) {
  const e = this;
  const f = $$0;
  debugger;
  const g = e.threshold;
  const h = f > g;
  return h;
};
const i = { threshold: 2 };
const j = $dotCall( c, b, "find", d, i );
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [1, 2, 3];
const arr = $(tmpCalleeParam);
const obj = { threshold: 2 };
const tmpMCF = arr.find;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x = $$0;
  debugger;
  const tmpBinBothLhs = x;
  const tmpBinBothRhs = tmpPrevalAliasThis.threshold;
  const tmpReturnArg = tmpBinBothLhs > tmpBinBothRhs;
  return tmpReturnArg;
};
const result = $dotCall(tmpMCF, arr, `find`, tmpMCP, obj);
$(result);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
