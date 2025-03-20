# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > While > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
while ((a = ($(1), $(2), $(x)))) $(100);
$(a, x);
`````


## Settled


`````js filename=intro
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


## PST Settled
With rename=true

`````js filename=intro
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


## Todos triggered


- objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 100
 - 5: 1
 - 6: 2
 - 7: 1
 - 8: 100
 - 9: 1
 - 10: 2
 - 11: 1
 - 12: 100
 - 13: 1
 - 14: 2
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 2
 - 19: 1
 - 20: 100
 - 21: 1
 - 22: 2
 - 23: 1
 - 24: 100
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
