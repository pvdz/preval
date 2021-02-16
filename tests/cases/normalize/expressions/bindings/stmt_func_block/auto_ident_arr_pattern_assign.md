# Preval test case

# auto_ident_arr_pattern_assign.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_arr_pattern_assign
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let x = 1,
      y = 2;

    let a = ([x, y] = [$(3), $(4)]);
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
  let a;
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  a = tmpNestedAssignArrPatternRhs;
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
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  $(tmpNestedAssignArrPatternRhs, x, y);
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
 - 3: [3, 4], 3, 4
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
