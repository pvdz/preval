# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Assignments > Binary left > Auto ident new complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = new ($($))(1)) + $(100));
$(a);
`````


## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
const a /*:object*/ = new tmpNewCallee(1);
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = a + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $($);
const a = new tmpNewCallee(1);
$(a + $(100));
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = new a( 1 );
const c = $( 100 );
const d = b + c;
$( d );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 100
 - 4: '[object Object]100'
 - 5: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
