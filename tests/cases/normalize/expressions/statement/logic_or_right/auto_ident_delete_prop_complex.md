# Preval test case

# auto_ident_delete_prop_complex.md

> Normalize > Expressions > Statement > Logic or right > Auto ident delete prop complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(100) || delete $(arg).y;
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const a /*:object*/ = { a: 999, b: 1000 };
const arg /*:object*/ = { y: 1 };
if (tmpIfTest) {
  $(a, arg);
} else {
  const tmpDeleteObj /*:unknown*/ = $(arg);
  delete tmpDeleteObj.y;
  $(a, arg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(100);
const a = { a: 999, b: 1000 };
const arg = { y: 1 };
if (tmpIfTest) {
  $(a, arg);
} else {
  const tmpDeleteObj = $(arg);
  delete tmpDeleteObj.y;
  $(a, arg);
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
const c = { y: 1 };
if (a) {
  $( b, c );
}
else {
  const d = $( c );
  delete d.y;
  $( b, c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, { y: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
