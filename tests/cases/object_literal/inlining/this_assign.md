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

## Pre Normal


`````js filename=intro
const obj = {
  g: 1,
  f: function () {
    const tmpPrevalAliasThis = this;
    debugger;
    tmpPrevalAliasThis.g = 2;
    $(tmpPrevalAliasThis.g);
  },
};
$(obj.f());
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = 1;
const tmpObjLitVal$1 = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  tmpPrevalAliasThis.g = 2;
  const tmpCallCallee = $;
  const tmpCalleeParam = tmpPrevalAliasThis.g;
  tmpCallCallee(tmpCalleeParam);
  return undefined;
};
const obj = { g: tmpObjLitVal, f: tmpObjLitVal$1 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = obj.f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const tmpObjLitVal$1 = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  tmpPrevalAliasThis.g = 2;
  const tmpCalleeParam = tmpPrevalAliasThis.g;
  $(tmpCalleeParam);
  return undefined;
};
const obj /*:object*/ = { g: 1, f: tmpObjLitVal$1 };
const tmpCalleeParam$1 = obj.f();
$(tmpCalleeParam$1);
`````

## PST Output

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
const e = d.f();
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
