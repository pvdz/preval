# Preval test case

# auto_ident_delete_prop_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident delete prop complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (; (a = delete $(arg).y); $(1));
$(a, arg);
`````

## Settled


`````js filename=intro
let a /*:boolean*/ = false;
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteObj.y;
if (tmpClusterSSA_a) {
  while ($LOOP_UNROLL_10) {
    $(1);
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
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
if (delete tmpDeleteObj.y) {
  while (true) {
    $(1);
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

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  while ((a = delete $(arg).y)) {
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
let a = false;
const b = { y: 1 };
const c = $( b );
const d = delete c.y;
if (d) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
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

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { y: '1' }
 - 2: 1
 - 3: {}
 - 4: 1
 - 5: {}
 - 6: 1
 - 7: {}
 - 8: 1
 - 9: {}
 - 10: 1
 - 11: {}
 - 12: 1
 - 13: {}
 - 14: 1
 - 15: {}
 - 16: 1
 - 17: {}
 - 18: 1
 - 19: {}
 - 20: 1
 - 21: {}
 - 22: 1
 - 23: {}
 - 24: 1
 - 25: {}
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check