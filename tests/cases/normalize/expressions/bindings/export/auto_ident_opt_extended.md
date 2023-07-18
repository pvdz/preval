# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Bindings > Export > Auto ident opt extended
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

export let a = b?.x.y.z;
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: { y: { z: 100 } } };
let a = b?.x.y.z;
export { a };
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = { z: 100 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
let b = { x: tmpObjLitVal };
let a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  const tmpChainElementObject$1 = tmpChainElementObject.y;
  const tmpChainElementObject$3 = tmpChainElementObject$1.z;
  a = tmpChainElementObject$3;
} else {
}
export { a };
$(a);
`````

## Output

`````js filename=intro
const a = 100;
export { a };
$(100);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 100;
export { a as a from "undefined"
$( 100 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
