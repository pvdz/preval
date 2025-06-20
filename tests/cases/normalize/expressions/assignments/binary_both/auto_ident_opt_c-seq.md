# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Assignments > Binary both > Auto ident opt c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b))?.x) + (a = (1, 2, $(b))?.x));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { x: 1 };
const tmpChainRootProp /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainRootProp == null;
let tmpBinBothLhs /*:unknown*/ /*ternaryConst*/ = undefined;
if (tmpIfTest) {
} else {
  tmpBinBothLhs = tmpChainRootProp.x;
}
const tmpChainRootProp$1 /*:unknown*/ = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainRootProp$1 == null;
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + undefined;
  $(tmpClusterSSA_tmpCalleeParam);
  $(undefined);
} else {
  const tmpClusterSSA_a$2 /*:unknown*/ = tmpChainRootProp$1.x;
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a$2;
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(tmpClusterSSA_a$2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpChainRootProp = $(b);
const tmpIfTest = tmpChainRootProp == null;
let tmpBinBothLhs = undefined;
if (!tmpIfTest) {
  tmpBinBothLhs = tmpChainRootProp.x;
}
const tmpChainRootProp$1 = $(b);
if (tmpChainRootProp$1 == null) {
  $(tmpBinBothLhs + undefined);
  $(undefined);
} else {
  const tmpClusterSSA_a$2 = tmpChainRootProp$1.x;
  $(tmpBinBothLhs + tmpClusterSSA_a$2);
  $(tmpClusterSSA_a$2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = b == null;
let d = undefined;
if (c) {

}
else {
  d = b.x;
}
const e = $( a );
const f = e == null;
if (f) {
  const g = d + undefined;
  $( g );
  $( undefined );
}
else {
  const h = e.x;
  const i = d + h;
  $( i );
  $( h );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootProp = $(b);
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
} else {
}
const tmpBinBothLhs = a;
a = undefined;
const tmpChainRootProp$1 = $(b);
const tmpIfTest$1 = tmpChainRootProp$1 != null;
if (tmpIfTest$1) {
  const tmpChainElementObject$1 = tmpChainRootProp$1.x;
  a = tmpChainElementObject$1;
} else {
}
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 2
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
