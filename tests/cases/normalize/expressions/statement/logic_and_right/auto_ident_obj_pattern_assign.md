# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Statement > Logic and right > Auto ident obj pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$(100) && ({ x, y } = { x: $(3), y: $(4) });
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
$(100) && ({ x: x, y: y } = { x: $(3), y: $(4) });
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpAssignObjPatternRhs.x;
  y = tmpAssignObjPatternRhs.y;
} else {
}
$(a, x, y);
`````

## Output

`````js filename=intro
const tmpIfTest = $(100);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  $(a, tmpObjLitVal, tmpObjLitVal$1);
} else {
  $(a, 1, 2);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = {
a: 999,
b: 1000
;
if (a) {
  const c = $( 3 );
  const d = $( 4 );
  $( b, c, d );
}
else {
  $( b, 1, 2 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 3
 - 3: 4
 - 4: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
