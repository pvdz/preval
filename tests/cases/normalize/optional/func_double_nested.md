# Preval test case

# global_double_nested.md

> normalize > member_access > global_double_nested
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

## Normalized

`````js filename=intro
function f() {
  const tmpObjLitVal$2 = $();
  const tmpObjLitVal$1 = { c: tmpObjLitVal$2 };
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = obj;
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.a;
    if (tmpChainElementObject) {
      const tmpChainElementObject$1 = tmpChainElementObject.b;
      if (tmpChainElementObject$1) {
        const tmpChainElementObject$2 = tmpChainElementObject$1.c;
        tmpCalleeParam = tmpChainElementObject$2;
      }
    }
  }
  const tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  return tmpReturnArg;
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
function f() {
  const tmpObjLitVal$2 = $();
  const tmpObjLitVal$1 = { c: tmpObjLitVal$2 };
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  let tmpCalleeParam = undefined;
  if (obj) {
    const tmpChainElementObject = obj.a;
    if (tmpChainElementObject) {
      const tmpChainElementObject$1 = tmpChainElementObject.b;
      if (tmpChainElementObject$1) {
        const tmpChainElementObject$2 = tmpChainElementObject$1.c;
        tmpCalleeParam = tmpChainElementObject$2;
      }
    }
  }
  const tmpReturnArg = $(tmpCalleeParam);
  return tmpReturnArg;
}
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
