# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident opt c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$({ [(a = (1, 2, $(b))?.x)]: 10 });
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$({ [(a = (1, 2, $(b))?.x)]: 10 });
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootProp = $(b);
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
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
let a /*:unknown*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainRootProp /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainRootProp == null;
let tmpObjLitPropKey /*:unknown*/ = undefined;
if (tmpIfTest) {
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainRootProp.x;
  a = tmpChainElementObject;
  tmpObjLitPropKey = tmpChainElementObject;
}
const tmpCalleeParam /*:object*/ = { [tmpObjLitPropKey]: 10 };
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const c = $( b );
const d = c == null;
let e = undefined;
if (d) {

}
else {
  const f = c.x;
  a = f;
  e = f;
}
const g = { [ e ]: 10 };
$( g );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { 1: '10' }
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
