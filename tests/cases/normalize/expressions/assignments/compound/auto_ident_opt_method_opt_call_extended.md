# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Compound > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$((a *= b?.c.d.e?.(1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest$1 /*:boolean*/ = $ == null;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest$1) {
  a ** 0;
  $($Number_NaN);
  $($Number_NaN);
} else {
  const tmpObjLitVal$1 /*:object*/ = { e: $ };
  const tmpChainElementCall /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
  const tmpClusterSSA_a /*:number*/ = a * tmpChainElementCall;
  $(tmpClusterSSA_a);
  $(tmpClusterSSA_a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest$1 = $ == null;
const a = { a: 999, b: 1000 };
if (tmpIfTest$1) {
  a ** 0;
  $($Number_NaN);
  $($Number_NaN);
} else {
  const tmpClusterSSA_a = a * $dotCall($, { e: $ }, `e`, 1);
  $(tmpClusterSSA_a);
  $(tmpClusterSSA_a);
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
  const c = { e: $ };
  const d = $dotCall( $, c, "e", 1 );
  const e = b * d;
  $( e );
  $( e );
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
