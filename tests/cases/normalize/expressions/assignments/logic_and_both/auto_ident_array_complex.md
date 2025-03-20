# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident array complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [$(1), 2, $(3)]) && (a = [$(1), 2, $(3)]));
$(a);
`````


## Settled


`````js filename=intro
$(1);
$(3);
const tmpArrElement$5 /*:unknown*/ = $(1);
const tmpArrElement$9 /*:unknown*/ = $(3);
const tmpNestedComplexRhs /*:array*/ = [tmpArrElement$5, 2, tmpArrElement$9];
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(3);
const tmpArrElement$5 = $(1);
const tmpArrElement$9 = $(3);
const tmpNestedComplexRhs = [tmpArrElement$5, 2, tmpArrElement$9];
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 3 );
const a = $( 1 );
const b = $( 3 );
const c = [ a, 2, b ];
$( c );
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 1
 - 4: 3
 - 5: [1, 2, 3]
 - 6: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
