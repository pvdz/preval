# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident cond s-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = (10, 20, 30) ? $(2) : $($(100))));
$(a);
`````

## Settled


`````js filename=intro
$(100);
let a /*:unknown*/ = $(2);
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    a = $(2);
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
let a = $(2);
if (a) {
  while (true) {
    $(100);
    a = $(2);
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
  if ((a = (10, 20, 30) ? $(2) : $($(100)))) {
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
  const tmpIfTest$1 = 30;
  if (tmpIfTest$1) {
    a = $(2);
  } else {
    const tmpCalleeParam = $(100);
    a = $(tmpCalleeParam);
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
let a = $( 2 );
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    a = $( 2 );
    if (a) {

    }
    else {
      break;
    }
  }
  $( a );
}
else {
  $( a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: 100
 - 4: 2
 - 5: 100
 - 6: 2
 - 7: 100
 - 8: 2
 - 9: 100
 - 10: 2
 - 11: 100
 - 12: 2
 - 13: 100
 - 14: 2
 - 15: 100
 - 16: 2
 - 17: 100
 - 18: 2
 - 19: 100
 - 20: 2
 - 21: 100
 - 22: 2
 - 23: 100
 - 24: 2
 - 25: 100
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
