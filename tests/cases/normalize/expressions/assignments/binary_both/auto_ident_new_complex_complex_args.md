# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Assignments > Binary both > Auto ident new complex complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new ($($))($(1), $(2))) + (a = new ($($))($(1), $(2))));
$(a);
`````


## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const tmpCalleeParam$3 /*:unknown*/ = $(2);
const a /*:object*/ = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3);
const tmpNewCallee$1 /*:unknown*/ = $($);
const tmpCalleeParam$5 /*:unknown*/ = $(1);
const tmpCalleeParam$7 /*:unknown*/ = $(2);
const tmpClusterSSA_a /*:object*/ = new tmpNewCallee$1(tmpCalleeParam$5, tmpCalleeParam$7);
const tmpCalleeParam /*:primitive*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
const a = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3);
const tmpNewCallee$1 = $($);
const tmpCalleeParam$5 = $(1);
const tmpCalleeParam$7 = $(2);
const tmpClusterSSA_a = new tmpNewCallee$1(tmpCalleeParam$5, tmpCalleeParam$7);
$(a + tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
const d = new a( b, c );
const e = $( $ );
const f = $( 1 );
const g = $( 2 );
const h = new e( f, g );
const i = d + h;
$( i );
$( h );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: '<$>'
 - 6: 1
 - 7: 2
 - 8: 1, 2
 - 9: '[object Object][object Object]'
 - 10: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
