# Preval test case

# ident_call_computed_complex_simple2.md

> Normalize > Expressions > Assignments > Logic and right > Ident call computed complex simple2
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(100) && (a = $(b)["$"](1)));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  const b /*:object*/ = { $: $ };
  const tmpCallObj /*:unknown*/ = $(b);
  const tmpNestedComplexRhs /*:unknown*/ = tmpCallObj.$(1);
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $($({ $: $ }).$(1));
} else {
  $(tmpCalleeParam);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  const b = { $: $ };
  const c = $( b );
  const d = c.$( 1 );
  $( d );
}
else {
  $( a );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { $: '"<$>"' }
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
