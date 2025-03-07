# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > For b > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (; (b = $(2)); $(1));
$(a, b);
`````

## Settled


`````js filename=intro
let b /*:unknown*/ = $(2);
if (b) {
  while ($LOOP_UNROLL_10) {
    $(1);
    b = $(2);
    if (b) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = $(2);
if (b) {
  while (true) {
    $(1);
    b = $(2);
    if (!b) {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  while ((b = $(2))) {
    $(1);
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while (true) {
  b = $(2);
  let tmpIfTest = b;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = $( 2 );
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    a = $( 2 );
    if (a) {

    }
    else {
      break;
    }
  }
}
const b = {
  a: 999,
  b: 1000,
};
$( b, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: 2
 - 6: 1
 - 7: 2
 - 8: 1
 - 9: 2
 - 10: 1
 - 11: 2
 - 12: 1
 - 13: 2
 - 14: 1
 - 15: 2
 - 16: 1
 - 17: 2
 - 18: 1
 - 19: 2
 - 20: 1
 - 21: 2
 - 22: 1
 - 23: 2
 - 24: 1
 - 25: 2
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
