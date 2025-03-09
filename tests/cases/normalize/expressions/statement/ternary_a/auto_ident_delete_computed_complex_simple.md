# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Statement > Ternary a > Auto ident delete computed complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete $(arg)["y"] ? $(100) : $(200);
$(a, arg);
`````

## Settled


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const tmpIfTest /*:boolean*/ = delete tmpDeleteObj.y;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a, arg);
} else {
  $(200);
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
  $(100);
  $(a, arg);
} else {
  $(200);
  $(a, arg);
}
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
delete $(arg)[`y`] ? $(100) : $(200);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteObj = $(arg);
const tmpIfTest = delete tmpDeleteObj.y;
if (tmpIfTest) {
  $(100);
  $(a, arg);
} else {
  $(200);
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
  $( 100 );
  $( d, a );
}
else {
  $( 200 );
  $( d, a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { y: '1' }
 - 2: 100
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
