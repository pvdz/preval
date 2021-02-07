# Preval test case

# auto_ident_obj_pattern_assign.md

> normalize > expressions > statement > switch_default > auto_ident_obj_pattern_assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    ({ x, y } = { x: $(3), y: $(4) });
}
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    ('default case:');
    const tmpObjLitVal = $(3);
    const tmpObjLitVal$1 = $(4);
    const tmpAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
    x = tmpAssignObjPatternRhs.x;
    y = tmpAssignObjPatternRhs.y;
    tmpAssignObjPatternRhs;
  }
}
$(a, x, y);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    ('default case:');
    const tmpObjLitVal = $(3);
    const tmpObjLitVal$1 = $(4);
    const tmpAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
    x = tmpAssignObjPatternRhs.x;
    y = tmpAssignObjPatternRhs.y;
    tmpAssignObjPatternRhs;
  }
}
$(a, 1, 2);
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
 - 1: 1
 - 2: 3
 - 3: 4
 - 4: { a: '999', b: '1000' }, 1, 2
 - eval returned: undefined
