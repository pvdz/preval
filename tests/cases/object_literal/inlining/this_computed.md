# Preval test case

# this_computed.md

> Object literal > Inlining > This computed
>
>

## Input

`````js filename=intro
const obj = {f: function(){ $(this['f f']); }};
$(obj.f());
`````

## Pre Normal


`````js filename=intro
const obj = {
  f: function () {
    const tmpPrevalAliasThis = this;
    debugger;
    $(tmpPrevalAliasThis[`f f`]);
  },
};
$(obj.f());
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = tmpPrevalAliasThis[`f f`];
  tmpCallCallee(tmpCalleeParam);
  return undefined;
};
const obj = { f: tmpObjLitVal };
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = obj.f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const tmpObjLitVal /*:()=>undefined*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  const tmpCalleeParam /*:unknown*/ = tmpPrevalAliasThis[`f f`];
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
  const c = b[ "f f" ];
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
