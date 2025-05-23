# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident call complex complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = $($)($(1), $(2))) || (a = $($)($(1), $(2))));
$(a);
`````


## Settled


`````js filename=intro
const tmpCallComplexCallee /*:unknown*/ = $($);
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const tmpCalleeParam$3 /*:unknown*/ = $(2);
const a /*:unknown*/ = tmpCallComplexCallee(tmpCalleeParam$1, tmpCalleeParam$3);
if (a) {
  $(a);
  $(a);
} else {
  const tmpCallComplexCallee$1 /*:unknown*/ = $($);
  const tmpCalleeParam$5 /*:unknown*/ = $(1);
  const tmpCalleeParam$7 /*:unknown*/ = $(2);
  const tmpNestedComplexRhs /*:unknown*/ = tmpCallComplexCallee$1(tmpCalleeParam$5, tmpCalleeParam$7);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallComplexCallee = $($);
const a = tmpCallComplexCallee($(1), $(2));
if (a) {
  $(a);
  $(a);
} else {
  const tmpCallComplexCallee$1 = $($);
  const tmpNestedComplexRhs = tmpCallComplexCallee$1($(1), $(2));
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
const d = a( b, c );
if (d) {
  $( d );
  $( d );
}
else {
  const e = $( $ );
  const f = $( 1 );
  const g = $( 2 );
  const h = e( f, g );
  $( h );
  $( h );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallComplexCallee = $($);
const tmpCallCallee = tmpCallComplexCallee;
let tmpCalleeParam$1 = $(1);
let tmpCalleeParam$3 = $(2);
a = tmpCallComplexCallee(tmpCalleeParam$1, tmpCalleeParam$3);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  const tmpCallComplexCallee$1 = $($);
  const tmpCallCallee$1 = tmpCallComplexCallee$1;
  let tmpCalleeParam$5 = $(1);
  let tmpCalleeParam$7 = $(2);
  const tmpNestedComplexRhs = tmpCallComplexCallee$1(tmpCalleeParam$5, tmpCalleeParam$7);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
}
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
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
