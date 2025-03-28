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
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  a ** 0;
  $($Number_NaN);
  $($Number_NaN);
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainRootProp.x;
  const tmpClusterSSA_a$1 /*:number*/ = a * tmpChainElementObject;
  $(tmpClusterSSA_a$1);
  $(tmpClusterSSA_a$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainRootProp = $({ x: 1 });
const tmpIfTest = tmpChainRootProp == null;
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  a ** 0;
  $($Number_NaN);
  $($Number_NaN);
} else {
  const tmpClusterSSA_a$1 = a * tmpChainRootProp.x;
  $(tmpClusterSSA_a$1);
  $(tmpClusterSSA_a$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = b == null;
const d = {
  a: 999,
  b: 1000,
};
if (c) {
  d ** 0;
  $( $Number_NaN );
  $( $Number_NaN );
}
else {
  const e = b.x;
  const f = d * e;
  $( f );
  $( f );
}
`````


## Todos triggered


None


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
