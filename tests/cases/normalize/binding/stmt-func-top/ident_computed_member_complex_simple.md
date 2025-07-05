# Preval test case

# ident_computed_member_complex_simple.md

> Normalize > Binding > Stmt-func-top > Ident computed member complex simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f() {
  let  b = {x: 2}, c = 3;
  let a = $(b)[$('x')] = c;
  $(a, b, c);
}
$(f());
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { x: 2 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
$(3, b, 3);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 2 };
const tmpInitAssignLhsComputedObj = $(b);
const tmpInitAssignLhsComputedProp = $(`x`);
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
$(3, b, 3);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 2 };
const b = $( a );
const c = $( "x" );
b[c] = 3;
$( 3, a, 3 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 2 };
  let c = 3;
  const tmpInitAssignLhsComputedObj = $(b);
  const tmpInitAssignLhsComputedProp = $(`x`);
  const tmpInitAssignLhsComputedRhs = c;
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  let a = tmpInitAssignLhsComputedRhs;
  $(tmpInitAssignLhsComputedRhs, b, c);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support ObjectExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '2' }
 - 2: 'x'
 - 3: 3, { x: '3' }, 3
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
