# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Assignments > For in right > Auto ident obj pattern assign
>
> Normalization of assignments should work the same everywhere they are

## Options

Known TDZ problem

- skipEval

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (let x in (a = { x, y } = { x: $(3), y: $(4) }));
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
for (let x$1 in (a = { x: x$1, y: y } = { x: $(3), y: $(4) }));
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x$1 = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
a = tmpNestedAssignObjPatternRhs;
let tmpForInDeclRhs = a;
let x$1 = undefined;
for (x$1 in tmpForInDeclRhs) {
}
$(a, x, y);
`````

## Output


`````js filename=intro
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
let x$1 = undefined;
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
for (x$1 in tmpNestedAssignObjPatternRhs) {
}
$(tmpNestedAssignObjPatternRhs, 1, tmpObjLitVal$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
let c = undefined;
const d = {
  x: a,
  y: b,
};
for (c in d) {

}
$( d, 1, b );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
