# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident opt c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ((1, 2, $(b))?.x) {
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
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  tmpChainRootProp.x;
  $(100);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainRootProp = $({ x: 1 });
const tmpIfTest = tmpChainRootProp == null;
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  tmpChainRootProp.x;
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
const d = {
  a: 999,
  b: 1000,
};
if (c) {
  $( 100 );
  $( d );
}
else {
  b.x;
  $( 100 );
  $( d );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
