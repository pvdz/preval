# Preval test case

# this_unknown_prop.md

> Object literal > Inlining > This unknown prop
>
>

## Input

`````js filename=intro
const obj = {f: function(){ $(this.g); }};
$(obj.f());
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:()=>undefined*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  const tmpCalleeParam /*:unknown*/ = tmpPrevalAliasThis.g;
  $(tmpCalleeParam);
  return undefined;
};
const obj /*:object*/ = { f: tmpObjLitVal };
const tmpCalleeParam$1 /*:unknown*/ = $dotCall(tmpObjLitVal, obj, `f`);
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = function () {
  const tmpPrevalAliasThis = this;
  $(tmpPrevalAliasThis.g);
};
$($dotCall(tmpObjLitVal, { f: tmpObjLitVal }, `f`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  const c = b.g;
  $( c );
  return undefined;
};
const d = { f: a };
const e = $dotCall( a, d, "f" );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  let tmpCalleeParam = tmpPrevalAliasThis.g;
  $(tmpCalleeParam);
  return undefined;
};
const obj = { f: tmpObjLitVal };
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
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
