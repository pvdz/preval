# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Statement > Logic or both > Auto ident delete prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete ($(1), $(2), arg).y || delete ($(1), $(2), arg).y;
$(a, arg);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
const tmpIfTest /*:boolean*/ = delete arg.y;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a, arg);
} else {
  $(1);
  $(2);
  delete arg.y;
  $(a, arg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const arg = { y: 1 };
const tmpIfTest = delete arg.y;
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a, arg);
} else {
  $(1);
  $(2);
  delete arg.y;
  $(a, arg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = { y: 1 };
const b = delete a.y;
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  $( c, a );
}
else {
  $( 1 );
  $( 2 );
  delete a.y;
  $( c, a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = arg;
const tmpIfTest = delete tmpDeleteObj.y;
if (tmpIfTest) {
  $(a, arg);
} else {
  $(1);
  $(2);
  const tmpDeleteObj$1 = arg;
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
 - 1: 1
 - 2: 2
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
