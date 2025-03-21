# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Assignments > For b > Auto ident delete prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (; (a = delete ($(1), $(2), $(arg)).y); $(1));
$(a, arg);
`````


## Settled


`````js filename=intro
let a /*:boolean*/ = false;
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteObj.y;
if (tmpClusterSSA_a) {
  while ($LOOP_UNROLL_10) {
    $(1);
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
  $(false, arg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = false;
$(1);
$(2);
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
if (delete tmpDeleteObj.y) {
  while (true) {
    $(1);
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
  $(false, arg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = false;
$( 1 );
$( 2 );
const b = { y: 1 };
const c = $( b );
const d = delete c.y;
if (d) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    $( 1 );
    $( 2 );
    const e = $( b );
    a = delete e.y;
    if (a) {

    }
    else {
      break;
    }
  }
  $( a, b );
}
else {
  $( false, b );
}
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
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: {}
 - 8: 1
 - 9: 1
 - 10: 2
 - 11: {}
 - 12: 1
 - 13: 1
 - 14: 2
 - 15: {}
 - 16: 1
 - 17: 1
 - 18: 2
 - 19: {}
 - 20: 1
 - 21: 1
 - 22: 2
 - 23: {}
 - 24: 1
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
