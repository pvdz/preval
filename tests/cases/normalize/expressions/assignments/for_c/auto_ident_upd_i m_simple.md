# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Assignments > For c > Auto ident upd i m simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (; $(1); a = b--);
$(a, b);
`````

## Settled


`````js filename=intro
let b /*:number*/ = 1;
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  b = 0;
  a = 1;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpPostUpdArgIdent$1 /*:unknown*/ = b;
      b = b - 1;
      a = tmpPostUpdArgIdent$1;
    } else {
      break;
    }
  }
} else {
}
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
if ($(1)) {
  b = 0;
  a = 1;
  while (true) {
    if ($(1)) {
      const tmpPostUpdArgIdent$1 = b;
      b = b - 1;
      a = tmpPostUpdArgIdent$1;
    } else {
      break;
    }
  }
}
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = b--;
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpPostUpdArgIdent = $coerce(b, `number`);
    b = tmpPostUpdArgIdent - 1;
    a = tmpPostUpdArgIdent;
  } else {
    break;
  }
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 1;
let b = {
  a: 999,
  b: 1000,
};
const c = $( 1 );
if (c) {
  a = 0;
  b = 1;
  while ($LOOP_UNROLL_10) {
    const d = $( 1 );
    if (d) {
      const e = a;
      a = a - 1;
      b = e;
    }
    else {
      break;
    }
  }
}
$( b, a );
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

Todos triggered:
- objects in isFree check