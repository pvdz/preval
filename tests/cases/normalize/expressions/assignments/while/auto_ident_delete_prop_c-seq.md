# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Assignments > While > Auto ident delete prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
while ((a = delete ($(1), $(2), $(arg)).y)) $(100);
$(a, arg);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
let a /*:boolean*/ = delete tmpDeleteObj.y;
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    $(1);
    $(2);
    const tmpDeleteObj$1 /*:unknown*/ = $(arg);
    a = delete tmpDeleteObj$1.y;
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
const tmpDeleteObj = $(arg);
let a = delete tmpDeleteObj.y;
if (a) {
  while (true) {
    $(100);
    $(1);
    $(2);
    const tmpDeleteObj$1 = $(arg);
    a = delete tmpDeleteObj$1.y;
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
const b = $( a );
let c = delete b.y;
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    $( 1 );
    $( 2 );
    const d = $( a );
    c = delete d.y;
    if (c) {

    }
    else {
      break;
    }
  }
  $( c, a );
}
else {
  $( c, a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  a = delete tmpDeleteObj.y;
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
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
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 100
 - 5: 1
 - 6: 2
 - 7: {}
 - 8: 100
 - 9: 1
 - 10: 2
 - 11: {}
 - 12: 100
 - 13: 1
 - 14: 2
 - 15: {}
 - 16: 100
 - 17: 1
 - 18: 2
 - 19: {}
 - 20: 100
 - 21: 1
 - 22: 2
 - 23: {}
 - 24: 100
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
