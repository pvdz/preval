# Preval test case

# if_spread_undefined.md

> Tests > Tofix > If spread undefined

Existing test.

When one branch leads to a crash we should maybe inline that?

In this case, tmpArrSpread starts as undefined. If tmpIfTest then it invariably
leads to `[...undefined]` which is a predictable crash. So we can pull them into
each branch of the `if` and resolve them accordingly.

## Input

`````js filename=intro
let a = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainElementCall = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpArrSpread = undefined;
if (tmpIfTest) {
} else {
  const tmpChainElementObject = tmpChainElementCall.x;
  a = tmpChainElementObject;
  tmpArrSpread = tmpChainElementObject;
}
const tmpCalleeParam /*:array*/ = [...tmpArrSpread];
$(tmpCalleeParam);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = undefined;
const b = { x: 1 };
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall == null;
let tmpArrSpread = undefined;
if (tmpIfTest) {
} else {
  const tmpChainElementObject = tmpChainElementCall.x;
  a = tmpChainElementObject;
  tmpArrSpread = tmpChainElementObject;
}
const tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
$(a);
`````

## Normalized


`````js filename=intro
let a = undefined;
const b = { x: 1 };
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall == null;
let tmpArrSpread = undefined;
if (tmpIfTest) {
} else {
  const tmpChainElementObject = tmpChainElementCall.x;
  a = tmpChainElementObject;
  tmpArrSpread = tmpChainElementObject;
}
const tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let a = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainElementCall = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpArrSpread = undefined;
if (tmpIfTest) {
} else {
  const tmpChainElementObject = tmpChainElementCall.x;
  a = tmpChainElementObject;
  tmpArrSpread = tmpChainElementObject;
}
const tmpCalleeParam /*:array*/ = [...tmpArrSpread];
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
const g = [ ...e ];
$( g );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
