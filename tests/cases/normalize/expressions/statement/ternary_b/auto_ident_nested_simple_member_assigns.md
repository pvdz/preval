# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Statement > Ternary b > Auto ident nested simple member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
$(1) ? (b.x = b.x = b.x = b.x = b.x = b.x = c) : $(200);
$(a, b, c);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ = { x: 1 };
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  b.x = 3;
  $(a, b, 3);
} else {
  $(200);
  $(a, b, 3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const b = { x: 1 };
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  b.x = 3;
  $(a, b, 3);
} else {
  $(200);
  $(a, b, 3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { x: 1 };
const c = {
  a: 999,
  b: 1000,
};
if (a) {
  b.x = 3;
  $( c, b, 3 );
}
else {
  $( 200 );
  $( c, b, 3 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
