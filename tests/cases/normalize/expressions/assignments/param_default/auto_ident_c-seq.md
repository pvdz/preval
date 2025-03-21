# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > Param default > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
function f(p = (a = ($(1), $(2), $(x)))) {}
$(f());
$(a, x);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpNestedComplexRhs /*:unknown*/ = $(1);
$(undefined);
$(tmpNestedComplexRhs, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpNestedComplexRhs = $(1);
$(undefined);
$(tmpNestedComplexRhs, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 1 );
$( undefined );
$( a, 1 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: undefined
 - 5: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
