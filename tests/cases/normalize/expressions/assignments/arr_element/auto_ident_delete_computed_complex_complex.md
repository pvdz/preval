# Preval test case

# auto_ident_delete_computed_complex_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident delete computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete $(arg)[$("y")]) + (a = delete $(arg)[$("y")]));
$(a, arg);
`````


## Settled


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const tmpDeleteCompObj /*:unknown*/ = $(arg);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteCompObj[tmpDeleteCompProp];
const tmpDeleteCompObj$1 /*:unknown*/ = $(arg);
const tmpDeleteCompProp$1 /*:unknown*/ = $(`y`);
const tmpClusterSSA_a$1 /*:boolean*/ = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
const tmpCalleeParam /*:number*/ = tmpClusterSSA_a + tmpClusterSSA_a$1;
$(tmpCalleeParam);
$(tmpClusterSSA_a$1, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
const tmpClusterSSA_a = delete tmpDeleteCompObj[tmpDeleteCompProp];
const tmpDeleteCompObj$1 = $(arg);
const tmpDeleteCompProp$1 = $(`y`);
const tmpClusterSSA_a$1 = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
$(tmpClusterSSA_a + tmpClusterSSA_a$1);
$(tmpClusterSSA_a$1, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
const c = $( "y" );
const d = delete b[ c ];
const e = $( a );
const f = $( "y" );
const g = delete e[ f ];
const h = d + g;
$( h );
$( g, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { y: '1' }
 - 2: 'y'
 - 3: {}
 - 4: 'y'
 - 5: 2
 - 6: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
