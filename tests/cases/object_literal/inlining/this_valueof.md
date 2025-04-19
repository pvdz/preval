# Preval test case

# this_valueof.md

> Object literal > Inlining > This valueof
>
>

## Input

`````js filename=intro
const obj = {g: 1, f: function(){ 
  $(this.g); 
}};
obj.value().g = 2;
$(obj.f());
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:()=>undefined*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  const tmpCalleeParam /*:unknown*/ = tmpPrevalAliasThis.g;
  $(tmpCalleeParam);
  return undefined;
};
const tmpCallCompVal /*:unknown*/ = $Object_prototype.value;
const obj /*:object*/ = { g: 1, f: tmpObjLitVal$1 };
const tmpAssignMemLhsObj /*:unknown*/ = $dotCall(tmpCallCompVal, obj, `value`);
tmpAssignMemLhsObj.g = 2;
const tmpCallCompVal$1 /*:unknown*/ = obj.f;
const tmpCalleeParam$1 /*:unknown*/ = $dotCall(tmpCallCompVal$1, obj, `f`);
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = function () {
  const tmpPrevalAliasThis = this;
  $(tmpPrevalAliasThis.g);
};
const tmpCallCompVal = $Object_prototype.value;
const obj = { g: 1, f: tmpObjLitVal$1 };
const tmpAssignMemLhsObj = $dotCall(tmpCallCompVal, obj, `value`);
tmpAssignMemLhsObj.g = 2;
$(obj.f());
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
const d = $Object_prototype.value;
const e = {
  g: 1,
  f: a,
};
const f = $dotCall( d, e, "value" );
f.g = 2;
const g = e.f;
const h = $dotCall( g, e, "f" );
$( h );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
