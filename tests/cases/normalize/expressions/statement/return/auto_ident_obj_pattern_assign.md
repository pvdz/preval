# Preval test case

# auto_ident_obj_pattern_assign.md

> normalize > expressions > statement > return > auto_ident_obj_pattern_assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
function f() {
  return ({ x, y } = { x: $(3), y: $(4) });
}
$(f());
$(a, x, y);
`````

## Normalized

`````js filename=intro
function f() {
  let tmpReturnArg;
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  tmpReturnArg = tmpNestedAssignObjPatternRhs;
  return tmpReturnArg;
}
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
('<hoisted func decl `f`>');
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, x, y);
`````

## Output

`````js filename=intro
function f() {
  let tmpReturnArg;
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  tmpReturnArg = tmpNestedAssignObjPatternRhs;
  return tmpReturnArg;
}
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, x, y);
`````

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: { x: '3', y: '4' }
 - 4: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
