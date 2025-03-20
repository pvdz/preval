# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Assignments > Binary right > Auto ident ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
$($(100) + (a = b = 2));
$(a, b, c);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + 2;
$(tmpCalleeParam);
$(2, 2, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100) + 2);
$(2, 2, 2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = a + 2;
$( b );
$( 2, 2, 2 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 102
 - 3: 2, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
