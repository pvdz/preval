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
  debugger;
  return $(parseInt(15)?.foo);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootCall = parseInt;
  const tmpChainElementCall = tmpChainRootCall(15);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainElementCall.foo;
    tmpCalleeParam = tmpChainElementObject;
  } else {
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
let tmpCalleeParam = undefined;
const tmpChainElementCall = parseInt(15);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.foo;
  tmpCalleeParam = tmpChainElementObject;
} else {
}
const tmpReturnArg = $(tmpCalleeParam);
$(tmpReturnArg);
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
