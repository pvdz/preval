# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Statement > For c > Auto ident ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
for (; $(1); b = 2);
$(a, b, c);
`````

## Settled


`````js filename=intro
let b /*:number*/ = 1;
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  b = 2;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b, 2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = 1;
if ($(1)) {
  b = 2;
  while (true) {
    if (!$(1)) {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, b, 2);
`````

## Pre Normal


`````js filename=intro
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    b = 2;
  }
}
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    b = 2;
  } else {
    break;
  }
}
$(a, b, c);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 1;
const b = $( 1 );
if (b) {
  a = 2;
  while ($LOOP_UNROLL_10) {
    const c = $( 1 );
    if (c) {

    }
    else {
      break;
    }
  }
}
const d = {
  a: 999,
  b: 1000,
};
$( d, a, 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
