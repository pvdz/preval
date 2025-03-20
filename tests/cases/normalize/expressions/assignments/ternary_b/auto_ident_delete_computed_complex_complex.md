# Preval test case

# auto_ident_delete_computed_complex_complex.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident delete computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$($(1) ? (a = delete $(arg)[$("y")]) : $(200));
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const arg /*:object*/ = { y: 1 };
if (tmpIfTest) {
  const tmpDeleteCompObj /*:unknown*/ = $(arg);
  const tmpDeleteCompProp /*:unknown*/ = $(`y`);
  const tmpNestedComplexRhs /*:boolean*/ = delete tmpDeleteCompObj[tmpDeleteCompProp];
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, arg);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, arg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const arg = { y: 1 };
if (tmpIfTest) {
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $(`y`);
  const tmpNestedComplexRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, arg);
} else {
  $($(200));
  $({ a: 999, b: 1000 }, arg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { y: 1 };
if (a) {
  const c = $( b );
  const d = $( "y" );
  const e = delete c[ d ];
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


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { y: '1' }
 - 3: 'y'
 - 4: true
 - 5: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
