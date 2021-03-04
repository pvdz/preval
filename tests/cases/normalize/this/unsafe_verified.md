# Preval test case

# unsafe_verified.md

> Normalize > This > Unsafe verified
>
> A constant set to null should be eliminated

Note: in strict mode this in global is gonna be bad.

#TODO

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

## Normalized

`````js filename=intro
let f = function () {
  const tmpPrevalThisAlias = this;
  let g = function () {
    $(x);
    const tmpReturnArg = x.y;
    return tmpReturnArg;
  };
  const x = tmpPrevalThisAlias;
  $(x);
  const tmpReturnArg$1 = g();
  return tmpReturnArg$1;
};
const tmpCallCallee = $;
const tmpCallObj = f;
const tmpCallVal = tmpCallObj.call;
const tmpCalleeParam$1 = { y: 1 };
const tmpCalleeParam = tmpCallVal.call(tmpCallObj, tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpPrevalThisAlias = this;
  const g = function () {
    $(tmpPrevalThisAlias);
    const tmpReturnArg = tmpPrevalThisAlias.y;
    return tmpReturnArg;
  };
  $(tmpPrevalThisAlias);
  const tmpReturnArg$1 = g();
  return tmpReturnArg$1;
};
const tmpCallVal = f.call;
const tmpCalleeParam$1 = { y: 1 };
const tmpCalleeParam = tmpCallVal.call(f, tmpCalleeParam$1);
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

Normalized calls: Same

Final output calls: Same
