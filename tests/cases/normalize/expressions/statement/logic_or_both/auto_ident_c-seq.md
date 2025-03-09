# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Statement > Logic or both > Auto ident c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
($(1), $(2), $(x)) || ($(1), $(2), $(x));
$(a, x);
`````

## Settled


`````js filename=intro
$(1);
$(2);
const tmpIfTest /*:unknown*/ = $(1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a, 1);
} else {
  $(1);
  $(2);
  $(1);
  $(a, 1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpIfTest = $(1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a, 1);
} else {
  $(1);
  $(2);
  $(1);
  $(a, 1);
}
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
($(1), $(2), $(x)) || ($(1), $(2), $(x));
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpIfTest = $(x);
if (tmpIfTest) {
  $(a, x);
} else {
  $(1);
  $(2);
  $(x);
  $(a, x);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 1 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( b, 1 );
}
else {
  $( 1 );
  $( 2 );
  $( 1 );
  $( b, 1 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
