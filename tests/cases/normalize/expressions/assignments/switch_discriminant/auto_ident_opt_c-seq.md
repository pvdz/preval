# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident opt c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ((a = (1, 2, $(b))?.x)) {
  default:
    $(100);
}
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpChainRootProp /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainRootProp == null;
if (tmpIfTest) {
  $(100);
  $(undefined);
} else {
  const a /*:unknown*/ = tmpChainRootProp.x;
  $(100);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainRootProp = $({ x: 1 });
if (tmpChainRootProp == null) {
  $(100);
  $(undefined);
} else {
  const a = tmpChainRootProp.x;
  $(100);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = b == null;
if (c) {
  $( 100 );
  $( undefined );
}
else {
  const d = b.x;
  $( 100 );
  $( d );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 100
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
