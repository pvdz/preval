# Preval test case

# queue_order.md

> If update var > Queue order
>
> The queue order is relevant for the if-update-var tests. This test caught why.

## Input

`````js filename=intro
const b = { x: 1 };
({ a: 999, b: 1000 });
let a = undefined;
const tmpIfTest = b == null;
if (tmpIfTest) {
} else {
  const tmpChainElementObject = b[`x`];
  a = tmpChainElementObject;
}
let tmpCalleeParam = a;
if (a) {
  let tmpNestedComplexRhs = undefined;
  const tmpIfTest$1 = b == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementObject$1 = b[`x`];
    tmpNestedComplexRhs = tmpChainElementObject$1;
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
$(tmpCalleeParam);
$(a);
`````


## Settled


`````js filename=intro
$(1);
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 1 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
