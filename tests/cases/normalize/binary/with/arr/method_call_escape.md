# Preval test case

# method_call_escape.md

> Normalize > Binary > With > Arr > Method call escape
>
> In this case the arr can still escape, so we can't allow index property calls either

Would be nice if we could solve this at some point, but it feels a bit specific.

## Input

`````js filename=intro
const arr = [function(){ return this; }];
$(arr[0]() === arr);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:()=>object*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  return tmpPrevalAliasThis;
};
const arr /*:array*/ = [tmpArrElement];
const tmpBinLhs /*:unknown*/ = $dotCall(tmpArrElement, arr, undefined);
const tmpCalleeParam /*:boolean*/ = tmpBinLhs === arr;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = function () {
  const tmpPrevalAliasThis = this;
  return tmpPrevalAliasThis;
};
const arr = [tmpArrElement];
$($dotCall(tmpArrElement, arr, undefined) === arr);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  return b;
};
const c = [ a ];
const d = $dotCall( a, c, undefined );
const e = d === c;
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  return tmpPrevalAliasThis;
};
const arr = [tmpArrElement];
const tmpMCF = arr[0];
const tmpBinLhs = $dotCall(tmpMCF, arr, undefined);
let tmpCalleeParam = tmpBinLhs === arr;
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: tmpArrElement
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) can we always safely clone ident refs in this case?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
