# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Assignments > Param default > Auto ident nested simple member assigns
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
function f(p = (a = b.x = b.x = b.x = b.x = b.x = b.x = c)) {}
$(f());
$(a, b, c);
`````


## Settled


`````js filename=intro
$(undefined);
const b /*:object*/ = { x: 3 };
$(3, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(3, { x: 3 }, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
const a = { x: 3 };
$( 3, a, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
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
    const tmpNestedComplexRhs = tmpInitAssignLhsComputedRhs;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b, c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 3, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
