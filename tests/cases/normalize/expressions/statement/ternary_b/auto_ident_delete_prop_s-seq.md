# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Statement > Ternary b > Auto ident delete prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(1) ? delete ($(1), $(2), arg).y : $(200);
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const arg /*:object*/ /*truthy*/ = { y: 1 };
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(1);
  $(2);
  delete arg.y;
  $(a, arg);
} else {
  $(200);
  $(a, arg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(1);
  $(2);
  delete arg.y;
  $(a, arg);
} else {
  $(200);
  $(a, arg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { y: 1 };
const c = {
  a: 999,
  b: 1000,
};
if (a) {
  $( 1 );
  $( 2 );
  delete b.y;
  $( c, b );
}
else {
  $( 200 );
  $( c, b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteObj = arg;
  delete tmpDeleteObj.y;
  $(a, arg);
} else {
  $(200);
  $(a, arg);
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
 - 4: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
