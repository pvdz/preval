# Preval test case

# auto_ident_computed_complex_complex.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = $(b)[$("c")]));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
const b /*:object*/ = { c: 1 };
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b);
} else {
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCalleeParam$1 /*:unknown*/ = $(`c`);
  const tmpNestedComplexRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam$1];
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(0);
const b = { c: 1 };
if (tmpIfTest) {
  $($(100));
  $({ a: 999, b: 1000 }, b);
} else {
  const tmpCompObj = $(b);
  const tmpCalleeParam$1 = $(`c`);
  const tmpNestedComplexRhs = tmpCompObj[tmpCalleeParam$1];
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = { c: 1 };
if (a) {
  const c = $( 100 );
  $( c );
  const d = {
    a: 999,
    b: 1000,
  };
  $( d, b );
}
else {
  const e = $( b );
  const f = $( "c" );
  const g = e[ f ];
  $( g );
  $( g, b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a, b);
} else {
  const tmpCompObj = $(b);
  const tmpCalleeParam$1 = $(`c`);
  const tmpNestedComplexRhs = tmpCompObj[tmpCalleeParam$1];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: { c: '1' }
 - 3: 'c'
 - 4: 1
 - 5: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
