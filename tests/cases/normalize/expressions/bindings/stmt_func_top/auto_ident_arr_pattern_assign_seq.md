# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident arr pattern assign seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let x = 1,
    y = 2;

  let a = ([x, y] = ($(x), $(y), [$(3), $(4)]));
  $(a, x, y);
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let x = 1;
  let y = 2;
  let a;
  $(x);
  $(y);
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  a = tmpNestedAssignArrPatternRhs;
  $(a, x, y);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  $(1);
  $(2);
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  const SSA_x = arrPatternSplat[0];
  const SSA_y = arrPatternSplat[1];
  $(tmpNestedAssignArrPatternRhs, SSA_x, SSA_y);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: [3, 4], 3, 4
 - 6: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
