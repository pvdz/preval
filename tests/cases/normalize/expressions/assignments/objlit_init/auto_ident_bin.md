# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident bin
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = $(1) + $(2)) });
$(a);
`````

## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(2);
const a /*:primitive*/ = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam /*:object*/ = { x: a };
$(tmpCalleeParam);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1) + $(2);
$({ x: a });
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = $(1) + $(2)) });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
a = tmpBinBothLhs + tmpBinBothRhs;
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a + b;
const d = { x: c };
$( d );
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { x: '3' }
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
