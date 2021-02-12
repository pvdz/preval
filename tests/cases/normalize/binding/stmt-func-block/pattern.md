# Preval test case

# pattern.md

> normalize > assignment > stmt > pattern
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
function f() {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let z = [10, 20, 30];
    let bindingPatternArrRoot = z;
    let arrPatternSplat = [...bindingPatternArrRoot];
    let x = arrPatternSplat[0];
    let y = arrPatternSplat[1];
    $(x, y, z);
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
    let z = [10, 20, 30];
    let bindingPatternArrRoot = z;
    let arrPatternSplat = [...bindingPatternArrRoot];
    let x = arrPatternSplat[0];
    let y = arrPatternSplat[1];
    $(x, y, z);
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: true
 - 2: 10, 20, [10, 20, 30]
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
