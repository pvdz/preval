# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > For b > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (; (a = ($(1), $(2), $(x))); $(1));
$(a, x);
`````

## Settled


`````js filename=intro
$(1);
$(2);
let a /*:unknown*/ = $(1);
if (a) {
  while ($LOOP_UNROLL_10) {
    $(1);
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
$(1);
$(2);
let a = $(1);
if (a) {
  while (true) {
    $(1);
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
{
  while ((a = ($(1), $(2), $(x)))) {
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
  a = $(x);
  let tmpIfTest = a;
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
let a = $( 1 );
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
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

Todos triggered:
- objects in isFree check