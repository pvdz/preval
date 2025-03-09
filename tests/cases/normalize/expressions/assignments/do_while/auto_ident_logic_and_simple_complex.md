# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident logic and simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = 1 && $($(1))));
$(a);
`````

## Settled


`````js filename=intro
$(100);
const tmpCalleeParam /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    a = $(tmpCalleeParam$1);
    if (a) {
    } else {
      break;
    }
  }
  $(a);
} else {
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
let a = $($(1));
if (a) {
  while (true) {
    $(100);
    a = $($(1));
    if (!a) {
      break;
    }
  }
  $(a);
} else {
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = 1 && $($(1)))) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  a = 1;
  if (a) {
    const tmpCalleeParam = $(1);
    a = $(tmpCalleeParam);
  } else {
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = $( 1 );
let b = $( a );
if (b) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const c = $( 1 );
    b = $( c );
    if (b) {

    }
    else {
      break;
    }
  }
  $( b );
}
else {
  $( b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 1
 - 4: 100
 - 5: 1
 - 6: 1
 - 7: 100
 - 8: 1
 - 9: 1
 - 10: 100
 - 11: 1
 - 12: 1
 - 13: 100
 - 14: 1
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 1
 - 19: 100
 - 20: 1
 - 21: 1
 - 22: 100
 - 23: 1
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