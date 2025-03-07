# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Assignments > Compound > Auto ident opt c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a *= (1, 2, $(b))?.x));
$(a);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpChainRootProp /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainRootProp == null;
let tmpClusterSSA_a /*:number*/ = NaN;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  a ** 0;
  $(NaN);
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainRootProp.x;
  tmpClusterSSA_a = a * tmpChainElementObject;
  $(tmpClusterSSA_a);
}
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainRootProp = $({ x: 1 });
const tmpIfTest = tmpChainRootProp == null;
let tmpClusterSSA_a = NaN;
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  a ** 0;
  $(NaN);
} else {
  tmpClusterSSA_a = a * tmpChainRootProp.x;
  $(tmpClusterSSA_a);
}
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$((a *= (1, 2, $(b))?.x));
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
let tmpBinBothRhs = undefined;
const tmpChainRootProp = $(b);
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpBinBothRhs = tmpChainElementObject;
} else {
}
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = b == null;
let d = NaN;
const e = {
  a: 999,
  b: 1000,
};
if (c) {
  e ** 0;
  $( NaN );
}
else {
  const f = b.x;
  d = e * f;
  $( d );
}
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: NaN
 - 3: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
