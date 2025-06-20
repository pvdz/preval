# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Statement > Logic and both > Auto ident delete prop simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete arg.y && delete arg.y;
$(a, arg);
`````


## Settled


`````js filename=intro
const arg /*:object*/ /*truthy*/ = { y: 1 };
const tmpIfTest /*:boolean*/ = delete arg.y;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  delete arg.y;
  $(a, arg);
} else {
  $(a, arg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
const tmpIfTest = delete arg.y;
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  delete arg.y;
  $(a, arg);
} else {
  $(a, arg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = delete a.y;
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  delete a.y;
  $( c, a );
}
else {
  $( c, a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = delete arg.y;
if (tmpIfTest) {
  delete arg.y;
  $(a, arg);
} else {
  $(a, arg);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
