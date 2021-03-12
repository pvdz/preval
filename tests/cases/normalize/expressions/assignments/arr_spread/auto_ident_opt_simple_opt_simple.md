# Preval test case

# auto_ident_opt_simple_opt_simple.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident opt simple opt simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
$([...(a = b?.x?.y)]);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
$([...(a = b?.x?.y)]);
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    a = tmpChainElementObject$1;
  }
}
let tmpArrSpread = a;
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { y: 1 };
const b = { x: tmpObjLitVal };
let SSA_a = undefined;
const tmpIfTest = b != null;
if (tmpIfTest) {
  const tmpChainElementObject = b.x;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    SSA_a = tmpChainElementObject$1;
  }
}
const tmpArrSpread = SSA_a;
const tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
