# Preval test case

# auto_ident_computed_complex_complex.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$($(1) ? (a = $(b)[$("c")]) : $(200));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ = { c: 1 };
if (tmpIfTest) {
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCalleeParam$1 /*:unknown*/ = $(`c`);
  const tmpNestedComplexRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam$1];
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, b);
} else {
  const tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const b = { c: 1 };
if (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpCalleeParam$1 = $(`c`);
  const tmpNestedComplexRhs = tmpCompObj[tmpCalleeParam$1];
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, b);
} else {
  $($(200));
  $({ a: 999, b: 1000 }, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { c: 1 };
if (a) {
  const c = $( b );
  const d = $( "c" );
  const e = c[ d ];
  $( e );
  $( e, b );
}
else {
  const f = $( 200 );
  $( f );
  const g = {
    a: 999,
    b: 1000,
  };
  $( g, b );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { c: '1' }
 - 3: 'c'
 - 4: 1
 - 5: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
