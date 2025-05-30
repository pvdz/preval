# Preval test case

# auto_ident_prop_c-seq.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = (1, 2, $(b)).c));
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
  const tmpNestedComplexRhs /*:unknown*/ = tmpCompObj.c;
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
  const tmpNestedComplexRhs = $(b).c;
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
  const f = e.c;
  $( f );
  $( f, b );
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
 - 3: 1
 - 4: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
