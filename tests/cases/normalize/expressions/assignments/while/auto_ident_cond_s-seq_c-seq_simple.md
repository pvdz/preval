# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > While > Auto ident cond s-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = (10, 20, 30) ? (40, 50, $(60)) : $($(100)))) $(100);
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = $(60);
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    a = $(60);
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
let a = $(60);
if (a) {
  while (true) {
    $(100);
    a = $(60);
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
while ((a = (10, 20, 30) ? (40, 50, $(60)) : $($(100)))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest$1 = 30;
  if (tmpIfTest$1) {
    a = $(60);
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
let a = $( 60 );
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    a = $( 60 );
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
 - 1: 60
 - 2: 100
 - 3: 60
 - 4: 100
 - 5: 60
 - 6: 100
 - 7: 60
 - 8: 100
 - 9: 60
 - 10: 100
 - 11: 60
 - 12: 100
 - 13: 60
 - 14: 100
 - 15: 60
 - 16: 100
 - 17: 60
 - 18: 100
 - 19: 60
 - 20: 100
 - 21: 60
 - 22: 100
 - 23: 60
 - 24: 100
 - 25: 60
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
