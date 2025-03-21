# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > While > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
while ((a = b = $(2))) $(100);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpNestedComplexRhs /*:unknown*/ = $(2);
let b /*:unknown*/ = tmpNestedComplexRhs;
let a /*:unknown*/ = tmpNestedComplexRhs;
if (tmpNestedComplexRhs) {
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
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedComplexRhs = $(2);
let b = tmpNestedComplexRhs;
let a = tmpNestedComplexRhs;
if (tmpNestedComplexRhs) {
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
  $(a, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
let b = a;
let c = a;
if (a) {
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
  $( c, b );
}
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 100
 - 3: 2
 - 4: 100
 - 5: 2
 - 6: 100
 - 7: 2
 - 8: 100
 - 9: 2
 - 10: 100
 - 11: 2
 - 12: 100
 - 13: 2
 - 14: 100
 - 15: 2
 - 16: 100
 - 17: 2
 - 18: 100
 - 19: 2
 - 20: 100
 - 21: 2
 - 22: 100
 - 23: 2
 - 24: 100
 - 25: 2
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
