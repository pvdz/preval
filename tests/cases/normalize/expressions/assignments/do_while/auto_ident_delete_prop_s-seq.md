# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Assignments > Do while > Auto ident delete prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = delete ($(1), $(2), arg).y));
$(a, arg);
`````


## Settled


`````js filename=intro
$(100);
$(1);
$(2);
const arg /*:object*/ /*truthy*/ = { y: 1 };
const tmpClusterSSA_a /*:boolean*/ = delete arg.y;
if (tmpClusterSSA_a) {
  let a /*:boolean*/ = false;
  while ($LOOP_UNROLLS_LEFT_10) {
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
  $(false, arg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(1);
$(2);
const arg = { y: 1 };
if (delete arg.y) {
  let a = false;
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
  $(false, arg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( 1 );
$( 2 );
const a = { y: 1 };
const b = delete a.y;
if (b) {
  let c = false;
  while ($LOOP_UNROLLS_LEFT_10) {
    $( 100 );
    $( 1 );
    $( 2 );
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
  $(1);
  $(2);
  const tmpDeleteObj = arg;
  a = delete tmpDeleteObj.y;
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
 - 2: 1
 - 3: 2
 - 4: 100
 - 5: 1
 - 6: 2
 - 7: 100
 - 8: 1
 - 9: 2
 - 10: 100
 - 11: 1
 - 12: 2
 - 13: 100
 - 14: 1
 - 15: 2
 - 16: 100
 - 17: 1
 - 18: 2
 - 19: 100
 - 20: 1
 - 21: 2
 - 22: 100
 - 23: 1
 - 24: 2
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
