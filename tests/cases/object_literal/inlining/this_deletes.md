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

## Pre Normal


`````js filename=intro
const obj = {
  g: 1,
  f: function () {
    const tmpPrevalAliasThis = this;
    debugger;
    $(delete tmpPrevalAliasThis.g);
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
  const tmpCallCallee = $;
  const tmpCalleeParam = delete tmpPrevalAliasThis.g;
  tmpCallCallee(tmpCalleeParam);
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = tmpPrevalAliasThis.g;
  tmpCallCallee$1(tmpCalleeParam$1);
  return undefined;
};
const obj = { g: tmpObjLitVal, f: tmpObjLitVal$1 };
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = obj.f();
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const tmpObjLitVal$1 /*:()=>undefined*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  const tmpCalleeParam /*:boolean*/ = delete tmpPrevalAliasThis.g;
  $(tmpCalleeParam);
  const tmpCalleeParam$1 = tmpPrevalAliasThis.g;
  $(tmpCalleeParam$1);
  return undefined;
};
const obj /*:object*/ = { g: 1, f: tmpObjLitVal$1 };
const tmpCalleeParam$3 = obj.f();
$(tmpCalleeParam$3);
`````

## PST Output

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
const f = e.f();
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
