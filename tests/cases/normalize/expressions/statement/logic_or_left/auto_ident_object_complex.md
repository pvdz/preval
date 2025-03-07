# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Statement > Logic or left > Auto ident object complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ x: $(1), y: 2, z: $(3) } || $(100));
$(a);
`````

## Settled


`````js filename=intro
$(1);
$(3);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(3);
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
({ x: $(1), y: 2, z: $(3) } || $(100));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$3 = $(3);
const tmpIfTest = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
if (tmpIfTest) {
} else {
  $(100);
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 3 );
const a = {
  a: 999,
  b: 1000,
};
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
