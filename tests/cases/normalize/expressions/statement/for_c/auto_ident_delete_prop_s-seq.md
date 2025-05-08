# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Statement > For c > Auto ident delete prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); delete ($(1), $(2), arg).y);
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const arg /*:object*/ = { y: 1 };
if (tmpIfTest) {
  $(1);
  $(2);
  delete arg.y;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      $(1);
      $(2);
      delete arg.y;
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const arg = { y: 1 };
if (tmpIfTest) {
  $(1);
  $(2);
  delete arg.y;
  while (true) {
    if ($(1)) {
      $(1);
      $(2);
      delete arg.y;
    } else {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { y: 1 };
if (a) {
  $( 1 );
  $( 2 );
  delete b.y;
  while ($LOOP_UNROLL_10) {
    const c = $( 1 );
    if (c) {
      $( 1 );
      $( 2 );
      delete b.y;
    }
    else {
      break;
    }
  }
}
const d = {
  a: 999,
  b: 1000,
};
$( d, b );
`````


## Todos triggered


- (todo) do we want to support UnaryExpression as expression statement in free loops?
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 1
 - 8: 1
 - 9: 2
 - 10: 1
 - 11: 1
 - 12: 2
 - 13: 1
 - 14: 1
 - 15: 2
 - 16: 1
 - 17: 1
 - 18: 2
 - 19: 1
 - 20: 1
 - 21: 2
 - 22: 1
 - 23: 1
 - 24: 2
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
