# Preval test case

# pattern.md

> normalize > assignment > for-a > pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
for (let [x, y] = z;false;) $(x, y, z);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let z = [10, 20, 30];
{
  let bindingPatternArrRoot = z;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let x_1 = arrPatternSplat[0];
  let y_1 = arrPatternSplat[1];
}
`````

## Output

`````js filename=intro
let x = 1;
let y = 2;
let z = [10, 20, 30];
{
  let bindingPatternArrRoot = z;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let x_1 = arrPatternSplat[0];
  let y_1 = arrPatternSplat[1];
}
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same