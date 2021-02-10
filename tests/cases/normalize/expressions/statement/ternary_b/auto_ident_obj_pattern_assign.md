# Preval test case

# auto_ident_obj_pattern_assign.md

> normalize > expressions > statement > ternary_b > auto_ident_obj_pattern_assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$(1) ? ({ x, y } = { x: $(3), y: $(4) }) : $(200);
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpAssignObjPatternRhs.x;
  y = tmpAssignObjPatternRhs.y;
} else {
  $(200);
}
$(a, x, y);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 4
 - 4: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
