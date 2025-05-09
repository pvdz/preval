# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Arr element > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$((a = b?.c.d.e?.(1)) + (a = b?.c.d.e?.(1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest$1 /*:boolean*/ = $ == null;
let tmpBinBothLhs /*:unknown*/ = undefined;
const tmpObjLitVal$1 /*:object*/ = { e: $ };
if (tmpIfTest$1) {
} else {
  tmpBinBothLhs = $dotCall($, tmpObjLitVal$1, `e`, 1);
}
const tmpChainElementObject$9 /*:unknown*/ = tmpObjLitVal$1.e;
const tmpIfTest$5 /*:boolean*/ = tmpChainElementObject$9 == null;
if (tmpIfTest$5) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + undefined;
  $(tmpClusterSSA_tmpCalleeParam);
  $(undefined);
} else {
  const tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, `e`, 1);
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a;
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(tmpClusterSSA_a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest$1 = $ == null;
let tmpBinBothLhs = undefined;
const tmpObjLitVal$1 = { e: $ };
if (!tmpIfTest$1) {
  tmpBinBothLhs = $dotCall($, tmpObjLitVal$1, `e`, 1);
}
const tmpChainElementObject$9 = tmpObjLitVal$1.e;
if (tmpChainElementObject$9 == null) {
  $(tmpBinBothLhs + undefined);
  $(undefined);
} else {
  const tmpClusterSSA_a = $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, `e`, 1);
  $(tmpBinBothLhs + tmpClusterSSA_a);
  $(tmpClusterSSA_a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
let b = undefined;
const c = { e: $ };
if (a) {

}
else {
  b = $dotCall( $, c, "e", 1 );
}
const d = c.e;
const e = d == null;
if (e) {
  const f = b + undefined;
  $( f );
  $( undefined );
}
else {
  const g = $dotCall( d, c, "e", 1 );
  const h = b + g;
  $( h );
  $( g );
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
 - 3: 2
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
