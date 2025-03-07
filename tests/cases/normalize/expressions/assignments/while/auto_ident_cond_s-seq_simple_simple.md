# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Assignments > While > Auto ident cond s-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = (10, 20, 30) ? $(2) : $($(100)))) $(100);
$(a);
`````

## Settled


`````js filename=intro
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
} else {
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $(2);
if (a) {
  while (true) {
    $(100);
    a = $(2);
    if (!a) {
      break;
    }
  }
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = (10, 20, 30) ? $(2) : $($(100)))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest$1 = 30;
  if (tmpIfTest$1) {
    a = $(2);
  } else {
    const tmpCalleeParam = $(100);
    a = $(tmpCalleeParam);
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
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
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 100
 - 3: 2
 - 4: 100
 - 5: 2
 - 6: 100
 - 7: 2
 - 8: 100
 - 9: 2
 - 10: 100
 - 11: 2
 - 12: 100
 - 13: 2
 - 14: 100
 - 15: 2
 - 16: 100
 - 17: 2
 - 18: 100
 - 19: 2
 - 20: 100
 - 21: 2
 - 22: 100
 - 23: 2
 - 24: 100
 - 25: 2
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
