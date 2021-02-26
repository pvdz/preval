# Preval test case

# pattern.md

> Normalize > Binding > Stmt-func-block > Pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f(){
if ($(true)) {
let z = [10, 20, 30];
  let [x, y] = z;
  $(x, y, z);
}
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let z = [10, 20, 30];
    let bindingPatternArrRoot = z;
    let arrPatternSplat = [...bindingPatternArrRoot];
    let x = arrPatternSplat[0];
    let y = arrPatternSplat[1];
    $(x, y, z);
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const z = [10, 20, 30];
    const arrPatternSplat = [...z];
    const x = arrPatternSplat[0];
    const y = arrPatternSplat[1];
    $(x, y, z);
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 10, 20, [10, 20, 30]
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
