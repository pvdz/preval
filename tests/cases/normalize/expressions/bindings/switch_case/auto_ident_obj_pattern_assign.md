# Preval test case

# auto_ident_obj_pattern_assign.md

> normalize > expressions > bindings > switch_case > auto_ident_obj_pattern_assign
>
> Normalization of var decls should work the same everywhere they are

#TODO

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

## Normalized

`````js filename=intro
{
  let x;
  let y;
  let a;
  {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 1;
    }
    if (tmpIfTest) {
      ('case 0:');
      {
        x = 1;
        y = 2;
        const tmpObjLitVal = $(3);
        const tmpObjLitVal$1 = $(4);
        const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
        x = tmpNestedAssignObjPatternRhs.x;
        y = tmpNestedAssignObjPatternRhs.y;
        a = tmpNestedAssignObjPatternRhs;
        $(a, x, y);
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
let x;
let y;
let a;
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  tmpIfTest = true;
}
if (tmpIfTest) {
  x = 1;
  y = 2;
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  a = tmpNestedAssignObjPatternRhs;
  $(a, x, y);
  tmpFallthrough = true;
}
`````

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: { x: '3', y: '4' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
