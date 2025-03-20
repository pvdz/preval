# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Statement > Ternary b > Auto ident delete prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(1) ? delete ($(1), $(2), $(arg)).y : $(200);
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const arg /*:object*/ = { y: 1 };
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteObj /*:unknown*/ = $(arg);
  delete tmpDeleteObj.y;
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
  const tmpDeleteObj = $(arg);
  delete tmpDeleteObj.y;
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
  const d = $( b );
  delete d.y;
  $( c, b );
}
else {
  $( 200 );
  $( c, b );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: { y: '1' }
 - 5: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
