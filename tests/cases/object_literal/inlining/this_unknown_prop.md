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

## Pre Normal


`````js filename=intro
const obj = {
  f: function () {
    const tmpPrevalAliasThis = this;
    debugger;
    $(tmpPrevalAliasThis.g);
  },
};
$(obj.f());
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const tmpCalleeParam = tmpPrevalAliasThis.g;
  $(tmpCalleeParam);
  return undefined;
};
const obj = { f: tmpObjLitVal };
const tmpCalleeParam$1 = obj.f();
$(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const tmpObjLitVal /*:()=>undefined*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  const tmpCalleeParam /*:unknown*/ = tmpPrevalAliasThis.g;
  $(tmpCalleeParam);
  return undefined;
};
const obj /*:object*/ = { f: tmpObjLitVal };
const tmpCalleeParam$1 /*:unknown*/ = obj.f();
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
const d = { f: a };
const e = d.f();
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
