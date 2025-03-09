# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > Do while > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = ($(1), $(2), $(x))));
$(a, x);
`````

## Settled


`````js filename=intro
$(100);
$(1);
$(2);
let a /*:unknown*/ = $(1);
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    $(1);
    $(2);
    a = $(1);
    if (a) {
    } else {
      break;
    }
  }
  $(a, 1);
} else {
  $(a, 1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(1);
$(2);
let a = $(1);
if (a) {
  while (true) {
    $(100);
    $(1);
    $(2);
    a = $(1);
    if (!a) {
      break;
    }
  }
  $(a, 1);
} else {
  $(a, 1);
}
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = ($(1), $(2), $(x)))) {
  } else {
    break;
  }
}
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  $(1);
  $(2);
  a = $(x);
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( 1 );
$( 2 );
let a = $( 1 );
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    $( 1 );
    $( 2 );
    a = $( 1 );
    if (a) {

    }
    else {
      break;
    }
  }
  $( a, 1 );
}
else {
  $( a, 1 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: 100
 - 6: 1
 - 7: 2
 - 8: 1
 - 9: 100
 - 10: 1
 - 11: 2
 - 12: 1
 - 13: 100
 - 14: 1
 - 15: 2
 - 16: 1
 - 17: 100
 - 18: 1
 - 19: 2
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check