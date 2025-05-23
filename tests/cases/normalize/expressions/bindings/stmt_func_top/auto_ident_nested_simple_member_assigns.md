# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident nested simple member assigns
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let b = { x: 1 },
    c = 3;

  let a = (b.x = b.x = b.x = b.x = b.x = b.x = c);
  $(a, b, c);
}
$(f());
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 3 };
$(3, b, 3);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3, { x: 3 }, 3);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 3 };
$( 3, a, 3 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 };
  let c = 3;
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
  let a = tmpInitAssignLhsComputedRhs;
  $(tmpInitAssignLhsComputedRhs, b, c);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3, { x: '3' }, 3
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
