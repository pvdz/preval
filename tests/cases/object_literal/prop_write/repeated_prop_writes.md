# Preval test case

# repeated_prop_writes.md

> Object literal > Prop write > Repeated prop writes
>
> When writing to the same obj property multiple times, inline them or remove dupes.

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
do {
  $(100);
  if (b.x === 3) {
    break;
  }
} while ((b.x = b.x = b.x = b.x = b.x = b.x = c));
$(a, b, c);
`````


## Settled


`````js filename=intro
$(100);
$(100);
const a /*:object*/ = { a: 999, b: 1000 };
const b /*:object*/ = { x: 3 };
$(a, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(100);
$({ a: 999, b: 1000 }, { x: 3 }, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( 100 );
const a = {
  a: 999,
  b: 1000,
};
const b = { x: 3 };
$( a, b, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpBinLhs = b.x;
  const tmpIfTest = tmpBinLhs === 3;
  if (tmpIfTest) {
    break;
  } else {
    const tmpInitAssignLhsComputedRhs$9 = c;
    b.x = tmpInitAssignLhsComputedRhs$9;
    const tmpInitAssignLhsComputedRhs$7 = tmpInitAssignLhsComputedRhs$9;
    b.x = tmpInitAssignLhsComputedRhs$7;
    const tmpInitAssignLhsComputedRhs$5 = tmpInitAssignLhsComputedRhs$7;
    b.x = tmpInitAssignLhsComputedRhs$5;
    const tmpInitAssignLhsComputedRhs$3 = tmpInitAssignLhsComputedRhs$5;
    b.x = tmpInitAssignLhsComputedRhs$3;
    const tmpInitAssignLhsComputedRhs$1 = tmpInitAssignLhsComputedRhs$3;
    b.x = tmpInitAssignLhsComputedRhs$1;
    const tmpInitAssignLhsComputedRhs = tmpInitAssignLhsComputedRhs$1;
    b.x = tmpInitAssignLhsComputedRhs;
    const tmpIfTest$1 = tmpInitAssignLhsComputedRhs;
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
}
$(a, b, c);
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
