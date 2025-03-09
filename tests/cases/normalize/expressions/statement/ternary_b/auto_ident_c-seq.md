# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Statement > Ternary b > Auto ident c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$(1) ? ($(1), $(2), $(x)) : $(200);
$(a, x);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(1);
  $(2);
  $(1);
  $(a, 1);
} else {
  $(200);
  $(a, 1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(1);
  $(2);
  $(1);
  $(a, 1);
} else {
  $(200);
  $(a, 1);
}
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1) ? ($(1), $(2), $(x)) : $(200);
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(1);
  $(2);
  $(x);
  $(a, x);
} else {
  $(200);
  $(a, x);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( 1 );
  $( 2 );
  $( 1 );
  $( b, 1 );
}
else {
  $( 200 );
  $( b, 1 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
