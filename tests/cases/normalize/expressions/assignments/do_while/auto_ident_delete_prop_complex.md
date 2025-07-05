# Preval test case

# auto_ident_delete_prop_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident delete prop complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = delete $(arg).y));
$(a, arg);
`````


## Settled


`````js filename=intro
$(100);
const arg /*:object*/ /*truthy*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteObj.y;
if (tmpClusterSSA_a) {
  let a /*:boolean*/ = false;
  while ($LOOP_UNROLLS_LEFT_10) {
    $(100);
    const tmpDeleteObj$1 /*:unknown*/ = $(arg);
    a = delete tmpDeleteObj$1.y;
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
const tmpDeleteObj = $(arg);
if (delete tmpDeleteObj.y) {
  let a = false;
  while (true) {
    $(100);
    const tmpDeleteObj$1 = $(arg);
    a = delete tmpDeleteObj$1.y;
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
const b = $( a );
const c = delete b.y;
if (c) {
  let d = false;
  while ($LOOP_UNROLLS_LEFT_10) {
    $( 100 );
    const e = $( a );
    d = delete e.y;
    if (d) {

    }
    else {
      break;
    }
  }
  $( d, a );
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
  const tmpDeleteObj = $(arg);
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
 - 2: { y: '1' }
 - 3: 100
 - 4: {}
 - 5: 100
 - 6: {}
 - 7: 100
 - 8: {}
 - 9: 100
 - 10: {}
 - 11: 100
 - 12: {}
 - 13: 100
 - 14: {}
 - 15: 100
 - 16: {}
 - 17: 100
 - 18: {}
 - 19: 100
 - 20: {}
 - 21: 100
 - 22: {}
 - 23: 100
 - 24: {}
 - 25: 100
 - 26: {}
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
