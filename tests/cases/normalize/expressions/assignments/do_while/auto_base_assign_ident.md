# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > Do while > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = b = $(2)));
$(a, b);
`````


## Settled


`````js filename=intro
$(100);
const tmpNestedComplexRhs /*:unknown*/ = $(2);
if (tmpNestedComplexRhs) {
  let b /*:unknown*/ = 1;
  let a /*:unknown*/ = undefined;
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpNestedComplexRhs$1 /*:unknown*/ = $(2);
    b = tmpNestedComplexRhs$1;
    a = tmpNestedComplexRhs$1;
    if (tmpNestedComplexRhs$1) {
    } else {
      break;
    }
  }
  $(a, b);
} else {
  $(tmpNestedComplexRhs, tmpNestedComplexRhs);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
const tmpNestedComplexRhs = $(2);
if (tmpNestedComplexRhs) {
  let b = 1;
  let a = undefined;
  while (true) {
    $(100);
    const tmpNestedComplexRhs$1 = $(2);
    b = tmpNestedComplexRhs$1;
    a = tmpNestedComplexRhs$1;
    if (!tmpNestedComplexRhs$1) {
      break;
    }
  }
  $(a, b);
} else {
  $(tmpNestedComplexRhs, tmpNestedComplexRhs);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = $( 2 );
if (a) {
  let b = 1;
  let c = undefined;
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const d = $( 2 );
    b = d;
    c = d;
    if (d) {

    }
    else {
      break;
    }
  }
  $( c, b );
}
else {
  $( a, a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpNestedComplexRhs = $(2);
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  const tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b);
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: 100
 - 4: 2
 - 5: 100
 - 6: 2
 - 7: 100
 - 8: 2
 - 9: 100
 - 10: 2
 - 11: 100
 - 12: 2
 - 13: 100
 - 14: 2
 - 15: 100
 - 16: 2
 - 17: 100
 - 18: 2
 - 19: 100
 - 20: 2
 - 21: 100
 - 22: 2
 - 23: 100
 - 24: 2
 - 25: 100
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
