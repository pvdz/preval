# Preval test case

# pattern_sequence_simple.md

> Normalize > Binding > For-a > Pattern sequence simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, z = [10, 20, 30];
for (let [x, y] = ($(a), $(b), z);false;) $(a, b, x, y, z);
`````

## Pre Normal

`````js filename=intro
let a = 1,
  b = 2,
  z = [10, 20, 30];
{
  let [x, y] = ($(a), $(b), z);
  while (false) {
    $(a, b, x, y, z);
  }
}
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let z = [10, 20, 30];
$(a);
$(b);
let bindingPatternArrRoot = z;
let arrPatternSplat = [...bindingPatternArrRoot];
let x = arrPatternSplat[0];
let y = arrPatternSplat[1];
`````

## Output

`````js filename=intro
const z = [10, 20, 30];
$(1);
$(2);
const arrPatternSplat = [...z];
arrPatternSplat[0];
arrPatternSplat[1];
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
