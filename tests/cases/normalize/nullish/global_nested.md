# Preval test case

# global_nested.md

> Normalize > Nullish > Global nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: $()}};
$(obj??a??b);
`````

## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:unknown*/ = $();
const tmpObjLitVal /*:object*/ = { b: tmpObjLitVal$1 };
const obj /*:object*/ = { a: tmpObjLitVal };
$(obj);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = $();
const tmpObjLitVal = { b: tmpObjLitVal$1 };
$({ a: tmpObjLitVal });
`````

## Pre Normal


`````js filename=intro
const obj = { a: { b: $() } };
$(obj ?? a ?? b);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = $();
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
let tmpCalleeParam = obj;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = a;
} else {
}
const tmpIfTest$1 = tmpCalleeParam == null;
if (tmpIfTest$1) {
  tmpCalleeParam = b;
} else {
}
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = { b: a };
const c = { a: b };
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - 2: { a: '{"b":"undefined"}' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
