# Preval test case

# pattern.md

> Normalize > Binding > Stmt-func-top > Pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f() {
  let x = 1, y = 2, z = [10, 20, 30];
  let [a, b] = z;
  $(a, b, x, y, z);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = 1,
    y = 2,
    z = [10, 20, 30];
  let [a, b] = z;
  $(a, b, x, y, z);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  let y = 2;
  let z = [10, 20, 30];
  let bindingPatternArrRoot = z;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let a = arrPatternSplat[0];
  let b = arrPatternSplat[1];
  $(a, b, x, y, z);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const z = [10, 20, 30];
const arrPatternSplat = [...z];
const a = arrPatternSplat[0];
const b = arrPatternSplat[1];
$(a, b, 1, 2, z);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10, 20, 1, 2, [10, 20, 30]
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
