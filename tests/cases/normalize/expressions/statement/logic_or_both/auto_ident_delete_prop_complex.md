# Preval test case

# auto_ident_delete_prop_complex.md

> Normalize > Expressions > Statement > Logic or both > Auto ident delete prop complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete $(arg).y || delete $(arg).y;
$(a, arg);
`````


## Settled


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const tmpIfTest /*:boolean*/ = delete tmpDeleteObj.y;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a, arg);
} else {
  const tmpDeleteObj$1 /*:unknown*/ = $(arg);
  delete tmpDeleteObj$1.y;
  $(a, arg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
const tmpIfTest = delete tmpDeleteObj.y;
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a, arg);
} else {
  const tmpDeleteObj$1 = $(arg);
  delete tmpDeleteObj$1.y;
  $(a, arg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
const c = delete b.y;
const d = {
  a: 999,
  b: 1000,
};
if (c) {
  $( d, a );
}
else {
  const e = $( a );
  delete e.y;
  $( d, a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteObj = $(arg);
const tmpIfTest = delete tmpDeleteObj.y;
if (tmpIfTest) {
  $(a, arg);
} else {
  const tmpDeleteObj$1 = $(arg);
  delete tmpDeleteObj$1.y;
  $(a, arg);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { y: '1' }
 - 2: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
