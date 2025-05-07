# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident new complex complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(1) ? (a = new ($($))($(1), $(2))) : $(200));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpNewCallee /*:unknown*/ = $($);
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  const tmpNestedComplexRhs /*:object*/ = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  const tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpNewCallee = $($);
  const tmpCalleeParam$1 = $(1);
  const tmpCalleeParam$3 = $(2);
  const tmpNestedComplexRhs = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  $($(200));
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( $ );
  const c = $( 1 );
  const d = $( 2 );
  const e = new b( c, d );
  $( e );
  $( e );
}
else {
  const f = $( 200 );
  $( f );
  const g = {
    a: 999,
    b: 1000,
  };
  $( g );
}
`````


## Todos triggered


None


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
 - 7: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
