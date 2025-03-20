# Preval test case

# ident_sequence_complex.md

> Normalize > Binding > Stmt-global-top > Ident sequence complex
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = 2, c = 3;
let a = ($(b), $(c));
$(a, b, c);
`````


## Settled


`````js filename=intro
$(2);
const a /*:unknown*/ = $(3);
$(a, 2, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
$($(3), 2, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
const a = $( 3 );
$( a, 2, 3 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 3
 - 3: 3, 2, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
