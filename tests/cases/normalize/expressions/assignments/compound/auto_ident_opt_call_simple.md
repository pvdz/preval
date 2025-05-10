# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Compound > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $?.(1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:boolean*/ = $ == null;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  a ** 0;
  $($Number_NaN);
  $($Number_NaN);
} else {
  const tmpClusterSSA_tmpBinBothRhs /*:unknown*/ = $(1);
  const tmpClusterSSA_a$3 /*:number*/ = a * tmpClusterSSA_tmpBinBothRhs;
  $(tmpClusterSSA_a$3);
  $(tmpClusterSSA_a$3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $ == null;
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  a ** 0;
  $($Number_NaN);
  $($Number_NaN);
} else {
  const tmpClusterSSA_a$3 = a * $(1);
  $(tmpClusterSSA_a$3);
  $(tmpClusterSSA_a$3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  b ** 0;
  $( $Number_NaN );
  $( $Number_NaN );
}
else {
  const c = $( 1 );
  const d = b * c;
  $( d );
  $( d );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: NaN
 - 3: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
