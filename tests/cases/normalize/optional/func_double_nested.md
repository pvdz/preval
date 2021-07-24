# Preval test case

# func_double_nested.md

> Normalize > Optional > Func double nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: {c: $()}}};
  return $(obj?.a?.b?.c);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const obj = { a: { b: { c: $() } } };
  return $(obj?.a?.b?.c);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpObjLitVal$3 = $();
  const tmpObjLitVal$1 = { c: tmpObjLitVal$3 };
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = obj;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.a;
    const tmpIfTest$1 = tmpChainElementObject != null;
    if (tmpIfTest$1) {
      const tmpChainElementObject$1 = tmpChainElementObject.b;
      const tmpIfTest$3 = tmpChainElementObject$1 != null;
      if (tmpIfTest$3) {
        const tmpChainElementObject$3 = tmpChainElementObject$1.c;
        tmpCalleeParam = tmpChainElementObject$3;
      } else {
      }
    } else {
    }
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
const tmpObjLitVal$3 = $();
const tmpClusterSSA_tmpReturnArg = $(tmpObjLitVal$3);
$(tmpClusterSSA_tmpReturnArg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
