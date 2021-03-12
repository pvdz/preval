# Preval test case

# global_nested.md

> Normalize > Optional > Global nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: $()}};
$(obj?.a?.b);
`````

## Pre Normal

`````js filename=intro
const obj = { a: { b: $() } };
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
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.a;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
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
const tmpIfTest = obj != null;
if (tmpIfTest) {
  const tmpChainElementObject = obj.a;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainElementObject.b;
    tmpCalleeParam = tmpChainElementObject$1;
  }
}
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
