# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident obj pattern assign
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = { x, y } = { x: $(3), y: $(4) })];
$(a, x, y);
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(3);
const tmpObjLitVal$1 /*:unknown*/ = $(4);
const obj /*:object*/ = {};
const tmpNestedAssignObjPatternRhs /*:object*/ = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
obj[tmpNestedAssignObjPatternRhs];
$(tmpNestedAssignObjPatternRhs, tmpObjLitVal, tmpObjLitVal$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const obj = {};
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
obj[tmpNestedAssignObjPatternRhs];
$(tmpNestedAssignObjPatternRhs, tmpObjLitVal, tmpObjLitVal$1);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = { x: x, y: y } = { x: $(3), y: $(4) })];
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
a = tmpNestedAssignObjPatternRhs;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a, x, y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
const c = {};
const d = {
  x: a,
  y: b,
};
c[ d ];
$( d, a, b );
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
