# Preval test case

# this_method_escaping.md

> Object literal > Inlining > This method escaping
>
>

## Input

`````js filename=intro
const obj = {f: function(){ $(this.f); return 'win'; }};
$(obj.f());
`````

## Pre Normal


`````js filename=intro
const obj = {
  f: function () {
    const tmpPrevalAliasThis = this;
    debugger;
    $(tmpPrevalAliasThis.f);
    return `win`;
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
  const tmpCalleeParam = tmpPrevalAliasThis.f;
  tmpCallCallee(tmpCalleeParam);
  return `win`;
};
const obj = { f: tmpObjLitVal };
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = obj.f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const tmpObjLitVal /*:()=>string*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  const tmpCalleeParam /*:unknown*/ = tmpPrevalAliasThis.f;
  $(tmpCalleeParam);
  return `win`;
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
  const c = b.f;
  $( c );
  return "win";
};
const d = { f: a };
const e = d.f();
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: 'win'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
