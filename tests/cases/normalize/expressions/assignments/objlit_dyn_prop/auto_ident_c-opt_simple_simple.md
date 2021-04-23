# Preval test case

# auto_ident_c-opt_simple_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident c-opt simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$({ [(a = b?.["x"])]: 10 });
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$({ [(a = b?.['x'])]: 10 });
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainRootComputed = 'x';
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  a = tmpChainElementObject;
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
const b = { x: 1 };
let a = undefined;
const tmpIfTest = b != null;
if (tmpIfTest) {
  const tmpChainElementObject = b.x;
  a = tmpChainElementObject;
} else {
}
const tmpObjLitPropKey = a;
const tmpCalleeParam = { [tmpObjLitPropKey]: 10 };
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 1: '10' }
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
