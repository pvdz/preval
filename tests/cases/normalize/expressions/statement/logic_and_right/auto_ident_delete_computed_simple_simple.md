# Preval test case

# auto_ident_delete_computed_simple_simple.md

> Normalize > Expressions > Statement > Logic and right > Auto ident delete computed simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(100) && delete arg["y"];
$(a, arg);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const arg /*:object*/ = { y: 1 };
const a /*:object*/ = { a: 999, b: 1000 };
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
const tmpIfTest = $(100);
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  delete arg.y;
  $(a, arg);
} else {
  $(a, arg);
}
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(100) && delete arg[`y`];
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
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
const a = $( 100 );
const b = { y: 1 };
const c = {
  a: 999,
  b: 1000,
};
if (a) {
  delete b.y;
  $( c, b );
}
else {
  $( c, b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
