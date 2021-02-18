# Preval test case

# auto_ident_obj_pattern_assign.md

> normalize > expressions > assignments > stmt_func_block > auto_ident_obj_pattern_assign
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let x = 1,
      y = 2;

    let a = { a: 999, b: 1000 };
    a = { x, y } = { x: $(3), y: $(4) };
    $(a, x, y);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let x = 1;
  let y = 2;
  let a = { a: 999, b: 1000 };
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  a = tmpNestedAssignObjPatternRhs;
  $(a, x, y);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  const SSA_x = tmpNestedAssignObjPatternRhs.x;
  const SSA_y = tmpNestedAssignObjPatternRhs.y;
  $(tmpNestedAssignObjPatternRhs, SSA_x, SSA_y);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: { x: '3', y: '4' }, 3, 4
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
