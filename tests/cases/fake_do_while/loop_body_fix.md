# Preval test case

# loop_body_fix.md

> Fake do while > Loop body fix

When there is a `x = true; while (true) if (x) { ... x = y; } else { break }` sort of structure then the body of the if-consequent
can be promoted to the parent block because the outer if inside the while is essentially the while test.

In this example the inner call and test update should be in the loop root

let test = 9;
while ($LOOP_NO_UNROLLS_LEFT) {
    if (test) {
      $('inner');
      test = test - 1;
    } else {
        break;
    }
}

let test = 9;
while ($LOOP_NO_UNROLLS_LEFT) {
    $('inner');
    test = test - 1;
    if (test) {
    } else {
        break;
    }
}

this will allow the code to ssa the test var, for better or worse

## Options

- unroll=30

## Input

`````js filename=intro
let test = 9;
while ($LOOP_NO_UNROLLS_LEFT) {
  if (test) {
    $('inner');
    test = test - 1;
  } else {
    break;
  }
}
`````


## Settled


`````js filename=intro
let test /*:number*/ = 9;
while ($LOOP_NO_UNROLLS_LEFT) {
  $(`inner`);
  test = test - 1;
  if (test) {
  } else {
    break;
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let test = 9;
while (true) {
  $(`inner`);
  test = test - 1;
  if (!test) {
    break;
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 9;
while ($LOOP_NO_UNROLLS_LEFT) {
  $( "inner" );
  a = a - 1;
  if (a) {

  }
  else {
    break;
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let test = 9;
while ($LOOP_NO_UNROLLS_LEFT) {
  if (test) {
    $(`inner`);
    test = test - 1;
  } else {
    break;
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'inner'
 - 2: 'inner'
 - 3: 'inner'
 - 4: 'inner'
 - 5: 'inner'
 - 6: 'inner'
 - 7: 'inner'
 - 8: 'inner'
 - 9: 'inner'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
