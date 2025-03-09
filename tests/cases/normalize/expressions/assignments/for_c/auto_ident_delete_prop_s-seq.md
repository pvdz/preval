# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Assignments > For c > Auto ident delete prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); a = delete ($(1), $(2), arg).y);
$(a, arg);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const arg /*:object*/ = { y: 1 };
if (tmpIfTest) {
  $(1);
  $(2);
  let tmpClusterSSA_a /*:boolean*/ = delete arg.y;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      $(1);
      $(2);
      tmpClusterSSA_a = delete arg.y;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, arg);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, arg);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const arg = { y: 1 };
if (tmpIfTest) {
  $(1);
  $(2);
  let tmpClusterSSA_a = delete arg.y;
  while (true) {
    if ($(1)) {
      $(1);
      $(2);
      tmpClusterSSA_a = delete arg.y;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, arg);
} else {
  $({ a: 999, b: 1000 }, arg);
}
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = delete ($(1), $(2), arg).y;
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(1);
    $(2);
    const tmpDeleteObj = arg;
    a = delete tmpDeleteObj.y;
  } else {
    break;
  }
}
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { y: 1 };
if (a) {
  $( 1 );
  $( 2 );
  let c = delete b.y;
  while ($LOOP_UNROLL_10) {
    const d = $( 1 );
    if (d) {
      $( 1 );
      $( 2 );
      c = delete b.y;
    }
    else {
      break;
    }
  }
  $( c, b );
}
else {
  const e = {
    a: 999,
    b: 1000,
  };
  $( e, b );
}
`````

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

Todos triggered:
- objects in isFree check
- regular property access of an ident feels tricky;