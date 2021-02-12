# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
const obj = {a: {b: $()}};
obj.a.b = 15;
$(obj?.a?.b);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = $();
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpAssignMemLhsObj = obj.a;
tmpAssignMemLhsObj.b = 15;
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
const tmpAssignMemLhsObj = obj.a;
tmpAssignMemLhsObj.b = 15;
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
 - 2: 15
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
