# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  return $(obj?.a?.b);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpObjLitVal$1 = $();
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = obj;
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.a;
    if (tmpChainElementObject) {
      const tmpChainElementObject$1 = tmpChainElementObject.b;
      tmpCalleeParam = tmpChainElementObject$1;
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
