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

## Pre Normal

`````js filename=intro
const obj = { a: { b: { c: $() } } };
$(obj?.a?.b?.c);
`````

## Normalized

`````js filename=intro
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
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpObjLitVal$3 = $();
$(tmpObjLitVal$3);
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
