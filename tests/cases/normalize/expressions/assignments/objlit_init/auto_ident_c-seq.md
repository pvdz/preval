# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$({ x: (a = ($(1), $(2), $(x))) });
$(a, x);
`````

## Settled


`````js filename=intro
$(1);
$(2);
const a /*:unknown*/ = $(1);
const tmpCalleeParam /*:object*/ = { x: a };
$(tmpCalleeParam);
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const a = $(1);
$({ x: a });
$(a, 1);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$({ x: (a = ($(1), $(2), $(x))) });
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
a = $(x);
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
$(tmpCalleeParam);
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 1 );
const b = { x: a };
$( b );
$( a, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: { x: '1' }
 - 5: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
