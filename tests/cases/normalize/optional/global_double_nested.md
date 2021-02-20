# Preval test case

# global_double_nested.md

> Normalize > Optional > Global double nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: {c: $()}}};
$(obj?.a?.b?.c);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$2 = $();
const tmpObjLitVal$1 = { c: tmpObjLitVal$2 };
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
    const tmpIfTest$2 = tmpChainElementObject$1 != null;
    if (tmpIfTest$2) {
      const tmpChainElementObject$2 = tmpChainElementObject$1.c;
      tmpCalleeParam = tmpChainElementObject$2;
    }
  }
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpObjLitVal$2 = $();
const tmpObjLitVal$1 = { c: tmpObjLitVal$2 };
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
let tmpCalleeParam = undefined;
const tmpIfTest = obj != null;
if (tmpIfTest) {
  const tmpChainElementObject = obj.a;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainElementObject.b;
    const tmpIfTest$2 = tmpChainElementObject$1 != null;
    if (tmpIfTest$2) {
      const tmpChainElementObject$2 = tmpChainElementObject$1.c;
      tmpCalleeParam = tmpChainElementObject$2;
    }
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

Normalized calls: Same

Final output calls: Same
