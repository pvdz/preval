# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Logic and left > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
(b = $(2)) && $(100);
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:unknown*/ = $(2);
const a /*:object*/ = { a: 999, b: 1000 };
if (b) {
  $(100);
  $(a, b);
} else {
  $(a, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = $(2);
const a = { a: 999, b: 1000 };
if (b) {
  $(100);
  $(a, b);
} else {
  $(a, b);
}
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
(b = $(2)) && $(100);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = $(2);
let tmpIfTest = b;
if (tmpIfTest) {
  $(100);
  $(a, b);
} else {
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( 100 );
  $( b, a );
}
else {
  $( b, a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 100
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
