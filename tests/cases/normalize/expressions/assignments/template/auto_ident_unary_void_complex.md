# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Template > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = void $(100))}  after`);
$(a);
`````


## Settled


`````js filename=intro
$(100);
$(`before  undefined  after`);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(`before  undefined  after`);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( "before  undefined  after" );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 'before undefined after'
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
