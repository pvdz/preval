# Preval test case

# ident_computed_member_simple_simple.md

> Normalize > Binding > Stmt-func-top > Ident computed member simple simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f() {
  let  b = {x: 2}, c = 3;
  let a = b[$('x')] = c;
  $(a, b, c);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
const b /*:object*/ = { x: 2 };
b[tmpInitAssignLhsComputedProp] = 3;
$(3, b, 3);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpInitAssignLhsComputedProp = $(`x`);
const b = { x: 2 };
b[tmpInitAssignLhsComputedProp] = 3;
$(3, b, 3);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "x" );
const b = { x: 2 };
b[a] = 3;
$( 3, b, 3 );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - 2: 3, { x: '3' }, 3
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
