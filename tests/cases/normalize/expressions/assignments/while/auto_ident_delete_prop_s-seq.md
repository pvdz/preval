# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Assignments > While > Auto ident delete prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
while ((a = delete ($(1), $(2), arg).y)) $(100);
$(a, arg);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
let a /*:boolean*/ = delete arg.y;
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    $(1);
    $(2);
    a = delete arg.y;
    if (a) {
    } else {
      break;
    }
  }
  $(a, arg);
} else {
  $(a, arg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const arg = { y: 1 };
let a = delete arg.y;
if (a) {
  while (true) {
    $(100);
    $(1);
    $(2);
    a = delete arg.y;
    if (!a) {
      break;
    }
  }
  $(a, arg);
} else {
  $(a, arg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = { y: 1 };
let b = delete a.y;
if (b) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    $( 1 );
    $( 2 );
    b = delete a.y;
    if (b) {

    }
    else {
      break;
    }
  }
  $( b, a );
}
else {
  $( b, a );
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
 - 3: 100
 - 4: 1
 - 5: 2
 - 6: 100
 - 7: 1
 - 8: 2
 - 9: 100
 - 10: 1
 - 11: 2
 - 12: 100
 - 13: 1
 - 14: 2
 - 15: 100
 - 16: 1
 - 17: 2
 - 18: 100
 - 19: 1
 - 20: 2
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: 100
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
