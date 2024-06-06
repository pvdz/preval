# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident opt extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
$({ [(a = b?.x.y.z)]: 10 });
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: { y: { z: 100 } } };
let a = { a: 999, b: 1000 };
$({ [(a = b?.x.y.z)]: 10 });
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { z: 100 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  const tmpChainElementObject$1 = tmpChainElementObject.y;
  const tmpChainElementObject$3 = tmpChainElementObject$1.z;
  a = tmpChainElementObject$3;
} else {
}
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = { [100]: 10 };
$(tmpCalleeParam);
$(100);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { 100[ 10 ]: 10 };
$( a );
$( 100 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 100: '10' }
 - 2: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
