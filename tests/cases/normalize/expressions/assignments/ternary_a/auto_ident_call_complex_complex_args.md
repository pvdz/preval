# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident call complex complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = $($)($(1), $(2))) ? $(100) : $(200));
$(a);
`````


## Settled


`````js filename=intro
const tmpCallComplexCallee /*:unknown*/ = $($);
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const tmpCalleeParam$3 /*:unknown*/ = $(2);
const a /*:unknown*/ = tmpCallComplexCallee(tmpCalleeParam$1, tmpCalleeParam$3);
if (a) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(a);
} else {
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallComplexCallee = $($);
const a = tmpCallComplexCallee($(1), $(2));
if (a) {
  $($(100));
  $(a);
} else {
  $($(200));
  $(a);
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
  const e = $( 100 );
  $( e );
  $( d );
}
else {
  const f = $( 200 );
  $( f );
  $( d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpCallComplexCallee = $($);
const tmpCallCallee = tmpCallComplexCallee;
let tmpCalleeParam$1 = $(1);
let tmpCalleeParam$3 = $(2);
a = tmpCallComplexCallee(tmpCalleeParam$1, tmpCalleeParam$3);
const tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
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
 - 5: 100
 - 6: 100
 - 7: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
