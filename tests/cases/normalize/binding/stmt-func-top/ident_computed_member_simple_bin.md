# Preval test case

# ident_computed_member_simple_bin.md

> Normalize > Binding > Stmt-func-top > Ident computed member simple bin
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f() {
  let  b = {x: 2}, c = 3, d = 4;
  let a = b[$('x')] = c + d;
  $(a, b, c);
}
$(f());
`````

## Settled


`````js filename=intro
const varInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
const b /*:object*/ = { x: 2 };
b[varInitAssignLhsComputedProp] = 7;
$(7, b, 3);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const varInitAssignLhsComputedProp = $(`x`);
const b = { x: 2 };
b[varInitAssignLhsComputedProp] = 7;
$(7, b, 3);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 2 },
    c = 3,
    d = 4;
  let a = (b[$(`x`)] = c + d);
  $(a, b, c);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 2 };
  let c = 3;
  let d = 4;
  const varInitAssignLhsComputedObj = b;
  const varInitAssignLhsComputedProp = $(`x`);
  const varInitAssignLhsComputedRhs = c + d;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  let a = varInitAssignLhsComputedRhs;
  $(varInitAssignLhsComputedRhs, b, c);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "x" );
const b = { x: 2 };
b[a] = 7;
$( 7, b, 3 );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'x'
 - 2: 7, { x: '7' }, 3
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
