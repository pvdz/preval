# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Stmt func block > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let b = {};

    let a = { a: 999, b: 1000 };
    a = { b } = $({ b: $(2) });
    $(a, b);
  }
}
$(f());
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam /*:object*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpClusterSSA_b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
$(tmpNestedAssignObjPatternRhs, tmpClusterSSA_b);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
$(tmpNestedAssignObjPatternRhs, tmpNestedAssignObjPatternRhs.b);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let b = {};
    let a = { a: 999, b: 1000 };
    a = { b: b } = $({ b: $(2) });
    $(a, b);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = {};
  let a = { a: 999, b: 1000 };
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
  b = tmpNestedAssignObjPatternRhs.b;
  a = tmpNestedAssignObjPatternRhs;
  $(tmpNestedAssignObjPatternRhs, b);
  return undefined;
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = { b: a };
const c = $( b );
const d = c.b;
$( c, d );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: { b: '2' }, 2
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
