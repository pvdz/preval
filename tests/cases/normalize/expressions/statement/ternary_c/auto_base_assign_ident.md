# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Ternary c > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(0) ? $(100) : (b = $(2));
$(a, b);
`````

## Settled


`````js filename=intro
let b /*:unknown*/ = 1;
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  $(100);
} else {
  b = $(2);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = 1;
if ($(0)) {
  $(100);
} else {
  b = $(2);
}
$({ a: 999, b: 1000 }, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$(0) ? $(100) : (b = $(2));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  b = $(2);
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 1;
const b = $( 0 );
if (b) {
  $( 100 );
}
else {
  a = $( 2 );
}
const c = {
  a: 999,
  b: 1000,
};
$( c, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 2
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
