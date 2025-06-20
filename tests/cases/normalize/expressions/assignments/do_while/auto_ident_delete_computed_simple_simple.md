# Preval test case

# auto_ident_delete_computed_simple_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident delete computed simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = delete arg["y"]));
$(a, arg);
`````


## Settled


`````js filename=intro
$(100);
const arg /*:object*/ /*truthy*/ = { y: 1 };
const tmpClusterSSA_a /*:boolean*/ = delete arg.y;
if (tmpClusterSSA_a) {
  let a /*:boolean*/ = false;
  while ($LOOP_UNROLL_10) {
    $(100);
    a = delete arg.y;
    if (a) {
    } else {
      break;
    }
  }
  $(a, arg);
} else {
  $(false, arg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
const arg = { y: 1 };
if (delete arg.y) {
  let a = false;
  while (true) {
    $(100);
    a = delete arg.y;
    if (!a) {
      break;
    }
  }
  $(a, arg);
} else {
  $(false, arg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = { y: 1 };
const b = delete a.y;
if (b) {
  let c = false;
  while ($LOOP_UNROLL_10) {
    $( 100 );
    c = delete a.y;
    if (c) {

    }
    else {
      break;
    }
  }
  $( c, a );
}
else {
  $( false, a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  a = delete arg.y;
  const tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, arg);
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 100
 - 4: 100
 - 5: 100
 - 6: 100
 - 7: 100
 - 8: 100
 - 9: 100
 - 10: 100
 - 11: 100
 - 12: 100
 - 13: 100
 - 14: 100
 - 15: 100
 - 16: 100
 - 17: 100
 - 18: 100
 - 19: 100
 - 20: 100
 - 21: 100
 - 22: 100
 - 23: 100
 - 24: 100
 - 25: 100
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
