# Preval test case

# feat_context.md

> Tofix > Feat context
>
> A constant set to null should be eliminated

this used to work and compile to f.apply

existing test case

## Input

`````js filename=intro
function f() {
  const x = this;
  $(x);
  function g() {
     $(x);
     return x.y; // The x should not be inlined
  }
  return g();
}
$(f.call({y: 1}));
`````

## Pre Normal

`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  let g = function () {
    debugger;
    $(x);
    return x.y;
  };
  const x = tmpPrevalAliasThis;
  $(x);
  return g();
};
$(f.call({ y: 1 }));
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  let g = function () {
    debugger;
    $(x);
    const tmpReturnArg = x.y;
    return tmpReturnArg;
  };
  const x = tmpPrevalAliasThis;
  $(x);
  const tmpReturnArg$1 = g();
  return tmpReturnArg$1;
};
const tmpCallCallee = $;
const tmpCallObj = f;
const tmpCallVal = tmpCallObj.call;
const tmpCalleeParam$1 = { y: 1 };
const tmpCalleeParam = $dotCall(tmpCallVal, tmpCallObj, tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  $(tmpPrevalAliasThis);
  $(tmpPrevalAliasThis);
  const tmpReturnArg = tmpPrevalAliasThis.y;
  return tmpReturnArg;
};
const tmpCalleeParam$1 = { y: 1 };
const tmpCalleeParam = f.call(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: { y: '1' }
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
