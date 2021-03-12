# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Statement > For in right > Auto ident obj pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (let x in ({ x, y } = ($(x), $(y), { x: $(3), y: $(4) })));
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
for (let x$1 in ({ x$1, y } = ($(x$1), $(y), { x: $(3), y: $(4) })));
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpForInDeclRhs;
$(x$1);
$(y);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x$1 = tmpNestedAssignObjPatternRhs.x$1;
y = tmpNestedAssignObjPatternRhs.y;
tmpForInDeclRhs = tmpNestedAssignObjPatternRhs;
let x$1;
for (x$1 in tmpForInDeclRhs) {
}
$(a, x, y);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(x$1);
$(2);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x$1 = tmpNestedAssignObjPatternRhs.x$1;
const SSA_y = tmpNestedAssignObjPatternRhs.y;
let x$1;
for (x$1 in tmpNestedAssignObjPatternRhs) {
}
$(a, 1, SSA_y);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
