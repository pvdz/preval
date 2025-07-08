# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > For b > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (; (a = b = $(2)); $(1));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpNestedComplexRhs /*:unknown*/ = $(2);
if (tmpNestedComplexRhs) {
  let a /*:unknown*/ = undefined;
  let b /*:unknown*/ = 1;
  while ($LOOP_UNROLLS_LEFT_10) {
    $(1);
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
const tmpNestedComplexRhs = $(2);
if (tmpNestedComplexRhs) {
  let a = undefined;
  let b = 1;
  while (true) {
    $(1);
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
const a = $( 2 );
if (a) {
  let b = undefined;
  let c = 1;
  while ($LOOP_UNROLLS_LEFT_10) {
    $( 1 );
    const d = $( 2 );
    c = d;
    b = d;
    if (d) {

    }
    else {
      break;
    }
  }
  $( b, c );
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
  const tmpNestedComplexRhs = $(2);
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
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
 - 1: 2
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: 2
 - 6: 1
 - 7: 2
 - 8: 1
 - 9: 2
 - 10: 1
 - 11: 2
 - 12: 1
 - 13: 2
 - 14: 1
 - 15: 2
 - 16: 1
 - 17: 2
 - 18: 1
 - 19: 2
 - 20: 1
 - 21: 2
 - 22: 1
 - 23: 2
 - 24: 1
 - 25: 2
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
