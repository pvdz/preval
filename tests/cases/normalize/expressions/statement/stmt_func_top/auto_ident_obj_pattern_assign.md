# Preval test case

# auto_ident_obj_pattern_assign.md

> normalize > expressions > statement > stmt_func_top > auto_ident_obj_pattern_assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let x = 1,
    y = 2;

  let a = { a: 999, b: 1000 };
  ({ x, y } = { x: $(3), y: $(4) });
  $(a, x, y);
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
  const tmpAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpAssignObjPatternRhs.x;
  y = tmpAssignObjPatternRhs.y;
  tmpAssignObjPatternRhs;
  $(a, x, y);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let x = 1;
  let y = 2;
  let a = { a: 999, b: 1000 };
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpAssignObjPatternRhs.x;
  y = tmpAssignObjPatternRhs.y;
  $(a, x, y);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: { a: '999', b: '1000' }, 3, 4
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
