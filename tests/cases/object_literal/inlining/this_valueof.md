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
const obj /*:object*/ = { g: 1, f: tmpObjLitVal$1 };
const tmpAssignMemLhsObj /*:unknown*/ = obj.value();
tmpAssignMemLhsObj.g = 2;
const tmpCalleeParam$1 /*:unknown*/ = obj.f();
$(tmpCalleeParam$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = function () {
  const tmpPrevalAliasThis = this;
  $(tmpPrevalAliasThis.g);
};
const obj = { g: 1, f: tmpObjLitVal$1 };
const tmpAssignMemLhsObj = obj.value();
tmpAssignMemLhsObj.g = 2;
$(obj.f());
`````

## Pre Normal


`````js filename=intro
const obj = {
  g: 1,
  f: function () {
    const tmpPrevalAliasThis = this;
    debugger;
    $(tmpPrevalAliasThis.g);
  },
};
obj.value().g = 2;
$(obj.f());
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = 1;
const tmpObjLitVal$1 = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const tmpCalleeParam = tmpPrevalAliasThis.g;
  $(tmpCalleeParam);
  return undefined;
};
const obj = { g: tmpObjLitVal, f: tmpObjLitVal$1 };
const tmpAssignMemLhsObj = obj.value();
tmpAssignMemLhsObj.g = 2;
const tmpCalleeParam$1 = obj.f();
$(tmpCalleeParam$1);
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
const d = {
  g: 1,
  f: a,
};
const e = d.value();
e.g = 2;
const f = d.f();
$( f );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
