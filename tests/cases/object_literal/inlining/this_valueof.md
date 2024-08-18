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
  const tmpCallCallee = $;
  const tmpCalleeParam = tmpPrevalAliasThis.g;
  tmpCallCallee(tmpCalleeParam);
  return undefined;
};
const obj = { g: tmpObjLitVal, f: tmpObjLitVal$1 };
const tmpAssignMemLhsObj = obj.value();
tmpAssignMemLhsObj.g = 2;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = obj.f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const tmpObjLitVal$1 = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const tmpCalleeParam = tmpPrevalAliasThis.g;
  $(tmpCalleeParam);
  return undefined;
};
const obj = { g: 1, f: tmpObjLitVal$1 };
const tmpAssignMemLhsObj = obj.value();
tmpAssignMemLhsObj.g = 2;
const tmpCalleeParam$1 = obj.f();
$(tmpCalleeParam$1);
`````

## PST Output

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

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
