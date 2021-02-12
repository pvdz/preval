# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: $()}};
$(obj?.a?.b);
`````

## Normalized

`````js filename=intro
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
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = $();
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
let tmpCalleeParam = undefined;
const tmpChainRootProp = obj;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.a;
  if (tmpChainElementObject) {
    const tmpChainElementObject$1 = tmpChainElementObject.b;
    tmpCalleeParam = tmpChainElementObject$1;
  }
}
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
