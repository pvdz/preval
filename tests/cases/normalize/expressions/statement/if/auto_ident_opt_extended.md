# Preval test case

# auto_ident_opt_extended.md

> normalize > expressions > statement > if > auto_ident_opt_extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
if (b?.x.y.z);
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = { z: 100 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  const tmpChainElementObject$1 = tmpChainElementObject.y;
  const tmpChainElementObject$2 = tmpChainElementObject$1.z;
  tmpIfTest = tmpChainElementObject$2;
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
