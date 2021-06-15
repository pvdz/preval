# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Statement > For of right > Auto ident obj pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Options

TDZ

- skipEval

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (let x of ({ x, y } = { x: $(3), y: $(4) }));
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
for (let x$1 of ({ x: x$1, y: y } = { x: $(3), y: $(4) }));
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpForOfDeclRhs = undefined;
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x$1 = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
tmpForOfDeclRhs = tmpNestedAssignObjPatternRhs;
let x$1 = undefined;
for (x$1 of tmpForOfDeclRhs) {
}
$(a, x, y);
`````

## Output

`````js filename=intro
$(3);
$(4);
throw `Preval: Cannot access \`x$1\` before initialization`;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
