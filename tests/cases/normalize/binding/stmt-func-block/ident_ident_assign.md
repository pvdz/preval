# Preval test case

# ident_ident_assign.md

> Normalize > Binding > Stmt-func-block > Ident ident assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = 2, c = 3, d = 4;
  let a= b = $(c).y = $(d);
  $(a, b, c);
}
}
$(f());
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpNestedAssignObj /*:unknown*/ = $(3);
  const tmpNestedAssignPropRhs /*:unknown*/ = $(4);
  tmpNestedAssignObj.y = tmpNestedAssignPropRhs;
  $(tmpNestedAssignPropRhs, tmpNestedAssignPropRhs, 3);
  $(undefined);
} else {
  $(undefined);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  const tmpNestedAssignObj = $(3);
  const tmpNestedAssignPropRhs = $(4);
  tmpNestedAssignObj.y = tmpNestedAssignPropRhs;
  $(tmpNestedAssignPropRhs, tmpNestedAssignPropRhs, 3);
  $(undefined);
} else {
  $(undefined);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($(true)) {
    let b = 2,
      c = 3,
      d = 4;
    let a = (b = $(c).y = $(d));
    $(a, b, c);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let b = 2;
    let c = 3;
    let d = 4;
    const tmpNestedAssignObj = $(c);
    const tmpNestedAssignPropRhs = $(d);
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
    b = tmpNestedPropAssignRhs;
    let a = b;
    $(b, b, c);
    return undefined;
  } else {
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $( 3 );
  const c = $( 4 );
  b.y = c;
  $( c, c, 3 );
  $( undefined );
}
else {
  $( undefined );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: 3
 - 3: 4
 - eval returned: ("<crash[ Cannot create property 'y' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
