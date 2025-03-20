# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto ident delete prop simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$($(100) + (a = delete arg.y));
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const arg /*:object*/ = { y: 1 };
const a /*:boolean*/ = delete arg.y;
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + a;
$(tmpCalleeParam);
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const arg = { y: 1 };
const a = delete arg.y;
$(tmpBinBothLhs + a);
$(a, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = { y: 1 };
const c = delete b.y;
const d = a + c;
$( d );
$( c, b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 101
 - 3: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
