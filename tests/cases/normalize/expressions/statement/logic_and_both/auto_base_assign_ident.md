# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Logic and both > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
(b = $(2)) && (b = $(2));
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:unknown*/ = $(2);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (b) {
  const tmpClusterSSA_b /*:unknown*/ = $(2);
  $(a, tmpClusterSSA_b);
} else {
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = $(2);
const a = { a: 999, b: 1000 };
if (b) {
  $(a, $(2));
} else {
  $(a, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  const c = $( 2 );
  $( b, c );
}
else {
  $( b, a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = $(2);
const tmpIfTest = b;
if (tmpIfTest) {
  b = $(2);
  $(a, b);
} else {
  $(a, b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
