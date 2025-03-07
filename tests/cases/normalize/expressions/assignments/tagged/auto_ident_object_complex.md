# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident object complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = { x: $(1), y: 2, z: $(3) })} after`;
$(a);
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const tmpObjLitVal$3 /*:unknown*/ = $(3);
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
const a /*:object*/ = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
$(tmpCalleeParam, a);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$3 = $(3);
const tmpCalleeParam = [`before `, ` after`];
const a = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
$(tmpCalleeParam, a);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = { x: $(1), y: 2, z: $(3) }));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$3 = $(3);
a = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = [ "before ", " after" ];
const d = {
  x: a,
  y: 2,
  z: b,
};
$( c, d );
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: ['before ', ' after'], { x: '1', y: '2', z: '3' }
 - 4: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
