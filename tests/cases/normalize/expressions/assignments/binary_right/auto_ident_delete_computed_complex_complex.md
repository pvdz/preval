# Preval test case

# auto_ident_delete_computed_complex_complex.md

> Normalize > Expressions > Assignments > Binary right > Auto ident delete computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$($(100) + (a = delete $(arg)[$("y")]));
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const arg /*:object*/ = { y: 1 };
const tmpDeleteCompObj /*:unknown*/ = $(arg);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteCompObj[tmpDeleteCompProp];
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
const tmpClusterSSA_a = delete tmpDeleteCompObj[tmpDeleteCompProp];
$(tmpBinBothLhs + tmpClusterSSA_a);
$(tmpClusterSSA_a, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = { y: 1 };
const c = $( b );
const d = $( "y" );
const e = delete c[ d ];
const f = a + e;
$( f );
$( e, b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { y: '1' }
 - 3: 'y'
 - 4: 101
 - 5: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
