# Preval test case

# auto_ident_obj_pattern_assign.md

> normalize > expressions > assignments > switch_case_block > auto_ident_obj_pattern_assign
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = { x, y } = { x: $(3), y: $(4) };
  }
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
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    const tmpBinBothRhs = $(1);
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    {
      {
        const tmpObjLitVal = $(3);
        const tmpObjLitVal$1 = $(4);
        const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
        x = tmpNestedAssignObjPatternRhs.x;
        y = tmpNestedAssignObjPatternRhs.y;
        a = tmpNestedAssignObjPatternRhs;
      }
    }
    tmpFallthrough = true;
  }
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
 - 2: 1
 - 3: 3
 - 4: 4
 - 5: { x: '3', y: '4' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
