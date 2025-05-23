# Preval test case

# this_assign.md

> Object literal > Inlining > This assign
>
>

## Input

`````js filename=intro
const obj = {g: 1, f: function(){ 
  this.g = 2; 
  $(this.g); 
}};
$(obj.f());
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:()=>undefined*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  tmpPrevalAliasThis.g = 2;
  const tmpCalleeParam /*:unknown*/ = tmpPrevalAliasThis.g;
  $(tmpCalleeParam);
  return undefined;
};
const obj /*:object*/ = { g: 1, f: tmpObjLitVal$1 };
const tmpCalleeParam$1 /*:unknown*/ = $dotCall(tmpObjLitVal$1, obj, `f`);
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = function () {
  const tmpPrevalAliasThis = this;
  tmpPrevalAliasThis.g = 2;
  $(tmpPrevalAliasThis.g);
};
$($dotCall(tmpObjLitVal$1, { g: 1, f: tmpObjLitVal$1 }, `f`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  b.g = 2;
  const c = b.g;
  $( c );
  return undefined;
};
const d = {
  g: 1,
  f: a,
};
const e = $dotCall( a, d, "f" );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = 1;
const tmpObjLitVal$1 = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  tmpPrevalAliasThis.g = 2;
  let tmpCalleeParam = tmpPrevalAliasThis.g;
  $(tmpCalleeParam);
  return undefined;
};
const obj = { g: tmpObjLitVal, f: tmpObjLitVal$1 };
const tmpMCF = obj.f;
let tmpCalleeParam$1 = $dotCall(tmpMCF, obj, `f`);
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
