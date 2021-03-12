# Preval test case

# func_call_prop.md

> Normalize > Optional > Func call prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  return $(parseInt(15)?.foo);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return $(parseInt(15)?.foo);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootCall = parseInt;
  const tmpChainElementCall = tmpChainRootCall(15);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainElementCall.foo;
    tmpCalleeParam = tmpChainElementObject;
  }
  const tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  return tmpReturnArg;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  let tmpCalleeParam = undefined;
  const tmpChainElementCall = parseInt(15);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainElementCall.foo;
    tmpCalleeParam = tmpChainElementObject;
  }
  const tmpReturnArg = $(tmpCalleeParam);
  return tmpReturnArg;
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
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
