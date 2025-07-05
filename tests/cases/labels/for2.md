# Preval test case

# for2.md

> Labels > For2
>
> If the sub-statement of a label is a loop then it should not become a block since that would be a syntax error with labeled continue.

## Input

`````js filename=intro
$(0);
foo: for(;$(true);) {
  if (0) break foo;
  else continue foo;
}
$(2);
`````


## Settled


`````js filename=intro
$(0);
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpIfTest$1 /*:unknown*/ = $(true);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
  $(2);
} else {
  $(2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
if ($(true)) {
  while (true) {
    if (!$(true)) {
      break;
    }
  }
  $(2);
} else {
  $(2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
const a = $( true );
if (a) {
  while ($LOOP_UNROLLS_LEFT_10) {
    const b = $( true );
    if (b) {

    }
    else {
      break;
    }
  }
  $( 2 );
}
else {
  $( 2 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(0);
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(2);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: true
 - 3: true
 - 4: true
 - 5: true
 - 6: true
 - 7: true
 - 8: true
 - 9: true
 - 10: true
 - 11: true
 - 12: true
 - 13: true
 - 14: true
 - 15: true
 - 16: true
 - 17: true
 - 18: true
 - 19: true
 - 20: true
 - 21: true
 - 22: true
 - 23: true
 - 24: true
 - 25: true
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
