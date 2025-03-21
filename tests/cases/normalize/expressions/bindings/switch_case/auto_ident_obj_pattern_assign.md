# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Bindings > Switch case > Auto ident obj pattern assign
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let x = 1,
      y = 2;

    let a = ({ x, y } = { x: $(3), y: $(4) });
    $(a, x, y);
}
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(3);
const tmpObjLitVal$1 /*:unknown*/ = $(4);
const tmpNestedAssignObjPatternRhs /*:object*/ = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
$(tmpNestedAssignObjPatternRhs, tmpObjLitVal, tmpObjLitVal$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
$({ x: tmpObjLitVal, y: tmpObjLitVal$1 }, tmpObjLitVal, tmpObjLitVal$1);
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let x;
  let y;
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    (x = 1), (y = 2);
    a = { x: x, y: y } = { x: $(3), y: $(4) };
    $(a, x, y);
  } else {
  }
}
`````

## Normalized


`````js filename=intro
let x = undefined;
let y = undefined;
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  x = 1;
  y = 2;
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  a = tmpNestedAssignObjPatternRhs;
  $(tmpNestedAssignObjPatternRhs, x, y);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
const c = {
  x: a,
  y: b,
};
$( c, a, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: { x: '3', y: '4' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
