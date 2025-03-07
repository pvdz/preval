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
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
let tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteObj.y;
if (tmpClusterSSA_a) {
  while ($LOOP_UNROLL_10) {
    $(1);
    $(1);
    $(2);
    const tmpDeleteObj$1 /*:unknown*/ = $(arg);
    tmpClusterSSA_a = delete tmpDeleteObj$1.y;
    if (tmpClusterSSA_a) {
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_a, arg);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
let tmpClusterSSA_a = delete tmpDeleteObj.y;
if (tmpClusterSSA_a) {
  while (true) {
    $(1);
    $(1);
    $(2);
    const tmpDeleteObj$1 = $(arg);
    tmpClusterSSA_a = delete tmpDeleteObj$1.y;
    if (!tmpClusterSSA_a) {
      break;
    }
  }
}
$(tmpClusterSSA_a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  while ((a = delete ($(1), $(2), $(arg)).y)) {
    $(1);
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  a = delete tmpDeleteObj.y;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, arg);
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
    $( 1 );
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
}
$( c, a );
`````

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

Todos triggered:
- objects in isFree check