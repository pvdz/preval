# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Assignments > Switch case top > Auto ident call complex complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = $($)($(1), $(2));
}
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCallComplexCallee /*:unknown*/ = $($);
  const tmpCalleeParam /*:unknown*/ = $(1);
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_a /*:unknown*/ = tmpCallComplexCallee(tmpCalleeParam, tmpCalleeParam$1);
  $(tmpClusterSSA_a);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === $(1)) {
  const tmpCallComplexCallee = $($);
  const tmpCalleeParam = $(1);
  $(tmpCallComplexCallee(tmpCalleeParam, $(2)));
} else {
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {
  const d = $( $ );
  const e = $( 1 );
  const f = $( 2 );
  const g = d( e, f );
  $( g );
}
else {
  const h = {
    a: 999,
    b: 1000,
  };
  $( h );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: '<$>'
 - 4: 1
 - 5: 2
 - 6: 1, 2
 - 7: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
