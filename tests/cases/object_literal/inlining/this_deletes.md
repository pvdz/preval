# Preval test case

# this_deletes.md

> Object literal > Inlining > This deletes
>
>

## Input

`````js filename=intro
const obj = {g: 1, f: function(){ $(delete this.g); $(this.g); }};
$(obj.f());
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:()=>undefined*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  const tmpCalleeParam /*:boolean*/ = delete tmpPrevalAliasThis.g;
  $(tmpCalleeParam);
  const tmpCalleeParam$1 /*:unknown*/ = tmpPrevalAliasThis.g;
  $(tmpCalleeParam$1);
  return undefined;
};
const obj /*:object*/ = { g: 1, f: tmpObjLitVal$1 };
const tmpCalleeParam$3 /*:unknown*/ = $dotCall(tmpObjLitVal$1, obj, `f`);
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = function () {
  const tmpPrevalAliasThis = this;
  $(delete tmpPrevalAliasThis.g);
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
  const c = delete b.g;
  $( c );
  const d = b.g;
  $( d );
  return undefined;
};
const e = {
  g: 1,
  f: a,
};
const f = $dotCall( a, e, "f" );
$( f );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
