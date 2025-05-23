# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > Arr element > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = b = $(2)) + (a = b = $(2)));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpNestedComplexRhs /*:unknown*/ = $(2);
const tmpNestedComplexRhs$1 /*:unknown*/ = $(2);
const tmpCalleeParam /*:primitive*/ = tmpNestedComplexRhs + tmpNestedComplexRhs$1;
$(tmpCalleeParam);
$(tmpNestedComplexRhs$1, tmpNestedComplexRhs$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedComplexRhs = $(2);
const tmpNestedComplexRhs$1 = $(2);
$(tmpNestedComplexRhs + tmpNestedComplexRhs$1);
$(tmpNestedComplexRhs$1, tmpNestedComplexRhs$1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = $( 2 );
const c = a + b;
$( c );
$( b, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpNestedComplexRhs = $(2);
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
const tmpBinBothLhs = a;
const tmpNestedComplexRhs$1 = $(2);
b = tmpNestedComplexRhs$1;
a = tmpNestedComplexRhs$1;
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 4
 - 4: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
