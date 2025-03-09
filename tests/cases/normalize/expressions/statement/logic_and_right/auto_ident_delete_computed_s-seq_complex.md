# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Statement > Logic and right > Auto ident delete computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(100) && delete ($(1), $(2), arg)[$("y")];
$(a, arg);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const arg /*:object*/ = { y: 1 };
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteCompProp /*:unknown*/ = $(`y`);
  delete arg[tmpDeleteCompProp];
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
  $(1);
  $(2);
  const tmpDeleteCompProp = $(`y`);
  delete arg[tmpDeleteCompProp];
  $(a, arg);
} else {
  $(a, arg);
}
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(100) && delete ($(1), $(2), arg)[$(`y`)];
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteCompObj = arg;
  const tmpDeleteCompProp = $(`y`);
  delete tmpDeleteCompObj[tmpDeleteCompProp];
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
  $( 1 );
  $( 2 );
  const d = $( "y" );
  delete b[ d ];
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
 - 2: 1
 - 3: 2
 - 4: 'y'
 - 5: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
