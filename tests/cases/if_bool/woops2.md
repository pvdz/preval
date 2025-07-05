# Preval test case

# woops2.md

> If bool > Woops2
>
>

## Input

`````js filename=intro
let tmp /*:boolean*/ /*ternaryConst*/ = true;
const test /*:unknown*/ = $(false);
if (test) {
} else {
  $(`B`);
  while ($LOOP_NO_UNROLLS_LEFT) {
    const test$1 /*:unknown*/ = $(`C`);
    $(`D`);
    if (test$1) {
      tmp = true;
    } else {
      $(`E`);
    }
    if (tmp) {}
    else {
      break;
    }
  }
}
`````


## Settled


`````js filename=intro
const test /*:unknown*/ = $(false);
if (test) {
} else {
  $(`B`);
  while ($LOOP_NO_UNROLLS_LEFT) {
    const test$1 /*:unknown*/ = $(`C`);
    $(`D`);
    if (test$1) {
    } else {
      $(`E`);
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$(false)) {
  $(`B`);
  while (true) {
    const test$1 = $(`C`);
    $(`D`);
    if (!test$1) {
      $(`E`);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
if (a) {

}
else {
  $( "B" );
  while ($LOOP_NO_UNROLLS_LEFT) {
    const b = $( "C" );
    $( "D" );
    if (b) {

    }
    else {
      $( "E" );
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmp = true;
const test = $(false);
if (test) {
} else {
  $(`B`);
  while ($LOOP_NO_UNROLLS_LEFT) {
    const test$1 = $(`C`);
    $(`D`);
    if (test$1) {
      tmp = true;
    } else {
      $(`E`);
    }
    if (tmp) {
    } else {
      break;
    }
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: 'B'
 - 3: 'C'
 - 4: 'D'
 - 5: 'C'
 - 6: 'D'
 - 7: 'C'
 - 8: 'D'
 - 9: 'C'
 - 10: 'D'
 - 11: 'C'
 - 12: 'D'
 - 13: 'C'
 - 14: 'D'
 - 15: 'C'
 - 16: 'D'
 - 17: 'C'
 - 18: 'D'
 - 19: 'C'
 - 20: 'D'
 - 21: 'C'
 - 22: 'D'
 - 23: 'C'
 - 24: 'D'
 - 25: 'C'
 - 26: 'D'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
