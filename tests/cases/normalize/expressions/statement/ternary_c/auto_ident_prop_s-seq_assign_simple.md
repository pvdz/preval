# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> Normalize > Expressions > Statement > Ternary c > Auto ident prop s-seq assign simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(0) ? $(100) : ((1, 2, b).c = 2);
$(a, b);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
const b /*:object*/ = { c: 1 };
if (tmpIfTest) {
  $(100);
} else {
  b.c = 2;
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(0);
const b = { c: 1 };
if (tmpIfTest) {
  $(100);
} else {
  b.c = 2;
}
$({ a: 999, b: 1000 }, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(0) ? $(100) : ((1, 2, b).c = 2);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpAssignMemLhsObj = b;
  tmpAssignMemLhsObj.c = 2;
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = { c: 1 };
if (a) {
  $( 100 );
}
else {
  b.c = 2;
}
const c = {
  a: 999,
  b: 1000,
};
$( c, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: { a: '999', b: '1000' }, { c: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
