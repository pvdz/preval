# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident nested member complex call
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let b = { x: 1 },
      c = { y: 2 },
      d = 3;

    let a = { a: 999, b: 1000 };
    a = $(b)[$("x")] = $(c)[$("y")] = $(d);
    $(a, b, c, d);
  }
}
$(f());
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
const c /*:object*/ = { y: 2 };
const varInitAssignLhsComputedObj /*:unknown*/ = $(c);
const varInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
const varInitAssignLhsComputedRhs /*:unknown*/ = $(3);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = varInitAssignLhsComputedRhs;
$(varInitAssignLhsComputedRhs, b, c, 3);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $(`x`);
const c = { y: 2 };
const varInitAssignLhsComputedObj = $(c);
const varInitAssignLhsComputedProp = $(`y`);
const varInitAssignLhsComputedRhs = $(3);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = varInitAssignLhsComputedRhs;
$(varInitAssignLhsComputedRhs, b, c, 3);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let b = { x: 1 },
      c = { y: 2 },
      d = 3;
    let a = { a: 999, b: 1000 };
    a = $(b)[$(`x`)] = $(c)[$(`y`)] = $(d);
    $(a, b, c, d);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 };
  let c = { y: 2 };
  let d = 3;
  let a = { a: 999, b: 1000 };
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $(`x`);
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedProp = $(`y`);
  const varInitAssignLhsComputedRhs = $(d);
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  $(tmpNestedPropAssignRhs, b, c, d);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( "x" );
const d = { y: 2 };
const e = $( d );
const f = $( "y" );
const g = $( 3 );
e[f] = g;
b[c] = g;
$( g, a, d, 3 );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: 3
 - 6: 3, { x: '3' }, { y: '3' }, 3
 - 7: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
