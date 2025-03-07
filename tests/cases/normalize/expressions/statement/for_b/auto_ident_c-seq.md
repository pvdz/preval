# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Statement > For b > Auto ident c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (; $(1), $(2), $(x); $(1));
$(a, x);
`````

## Settled


`````js filename=intro
$(1);
$(2);
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(1);
    $(1);
    $(2);
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
if ($(1)) {
  while (true) {
    $(1);
    $(1);
    $(2);
    if (!$(1)) {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, 1);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  while (($(1), $(2), $(x))) {
    $(1);
  }
}
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
while (true) {
  $(1);
  $(2);
  const tmpIfTest = $(x);
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 1 );
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    $( 1 );
    $( 2 );
    const b = $( 1 );
    if (b) {

    }
    else {
      break;
    }
  }
}
const c = {
  a: 999,
  b: 1000,
};
$( c, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 2
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 2
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 2
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 2
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
