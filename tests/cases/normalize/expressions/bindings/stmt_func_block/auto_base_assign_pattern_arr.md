# Preval test case

# auto_base_assign_pattern_arr.md

> normalize > expressions > bindings > stmt_func_block > auto_base_assign_pattern_arr
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = [];

    let a = ([b] = $([$(2)]));
    $(a, b);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let b = [];
    let a;
    const tmpCallCallee = $;
    const tmpArrElement = $(2);
    const tmpCalleeParam = [tmpArrElement];
    const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    b = arrPatternSplat[0];
    a = tmpNestedAssignArrPatternRhs;
    $(a, b);
  }
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
function f() {
  let b = [];
  let a;
  const tmpCallCallee = $;
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = arrPatternSplat[0];
  a = tmpNestedAssignArrPatternRhs;
  $(a, b);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: [2], 2
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
