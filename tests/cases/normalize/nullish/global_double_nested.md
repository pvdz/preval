# Preval test case

# global_double_nested.md

> Normalize > Nullish > Global double nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: {c: $()}}};
$(obj??a??b??c);
`````

## Settled


`````js filename=intro
const tmpObjLitVal$3 /*:unknown*/ = $();
const tmpObjLitVal$1 /*:object*/ = { c: tmpObjLitVal$3 };
const tmpObjLitVal /*:object*/ = { b: tmpObjLitVal$1 };
const obj /*:object*/ = { a: tmpObjLitVal };
$(obj);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$3 = $();
const tmpObjLitVal$1 = { c: tmpObjLitVal$3 };
const tmpObjLitVal = { b: tmpObjLitVal$1 };
$({ a: tmpObjLitVal });
`````

## Pre Normal


`````js filename=intro
const obj = { a: { b: { c: $() } } };
$(obj ?? a ?? b ?? c);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$3 = $();
const tmpObjLitVal$1 = { c: tmpObjLitVal$3 };
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
const tmpIfTest$3 = tmpCalleeParam == null;
if (tmpIfTest$3) {
  tmpCalleeParam = c;
} else {
}
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = { c: a };
const c = { b: b };
const d = { a: c };
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - 2: { a: '{"b":"{\\"c\\":\\"undefined\\"}"}' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
