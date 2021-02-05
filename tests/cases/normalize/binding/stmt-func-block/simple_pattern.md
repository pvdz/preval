# Preval test case

# simple_pattern.md

> normalize > assignment > stmt > simple_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f(){
if ($(true)) {
let x = 1, y = 2, z = [10, 20, 30];
  let a= [x, y] = z;
  $(a, x, y, z);
}
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let x = 1;
    let y = 2;
    let z = [10, 20, 30];
    let a;
    const tmpNestedAssignArrPatternRhs = z;
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    x = arrPatternSplat[0];
    y = arrPatternSplat[1];
    a = tmpNestedAssignArrPatternRhs;
    $(a, x, y, z);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let x = 1;
    let y = 2;
    let z = [10, 20, 30];
    let a;
    const tmpNestedAssignArrPatternRhs = z;
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    x = arrPatternSplat[0];
    y = arrPatternSplat[1];
    a = tmpNestedAssignArrPatternRhs;
    $(a, x, y, z);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: true
 - 2: [10, 20, 30], 10, 20, [10, 20, 30]
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
