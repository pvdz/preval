# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > For in right > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (let x in (a = b = $(2)));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpNestedComplexRhs /*:unknown*/ = $(2);
const tmpForInGen /*:unknown*/ = $forIn(tmpNestedComplexRhs);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForInNext.value;
  }
}
$(tmpNestedComplexRhs, tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedComplexRhs = $(2);
const tmpForInGen = $forIn(tmpNestedComplexRhs);
while (true) {
  const tmpForInNext = tmpForInGen.next();
  if (tmpForInNext.done) {
    break;
  } else {
    tmpForInNext.value;
  }
}
$(tmpNestedComplexRhs, tmpNestedComplexRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = $forIn( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b.next();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    c.value;
  }
}
$( a, a );
`````


## Todos triggered


- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
