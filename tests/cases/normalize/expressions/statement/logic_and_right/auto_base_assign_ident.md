# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Logic and right > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(100) && (b = $(2));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpClusterSSA_b /*:unknown*/ = $(2);
  $(a, tmpClusterSSA_b);
} else {
  $(a, 1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(100);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a, $(2));
} else {
  $(a, 1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  const c = $( 2 );
  $( b, c );
}
else {
  $( b, 1 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
