# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Assignments > Switch default > Auto ident new complex complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = new ($($))($(1), $(2));
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpNewCallee /*:unknown*/ = $($);
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const a /*:object*/ = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpNewCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
$(new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1));
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
const d = new a( b, c );
$( d );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: '<$>'
 - 3: 1
 - 4: 2
 - 5: 1, 2
 - 6: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
