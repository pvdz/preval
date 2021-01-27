# Preval test case

# pattern_sequence_complex.md

> normalize > assignment > stmt > pattern_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f() {
  let x = 1, y = 2, z = [10, 20, 30];
  let [a, b] = ($(x), $(y), $(z));
  $(a, b, x, y, z);
}
$(f());
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
$(x);
$(y);
arrAssignPatternRhs = $(z);
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
arrAssignPatternRhs;
$(x, y, z);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
$(x);
$(y);
arrAssignPatternRhs = $(z);
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
$(x, y, z);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: [10,20,30]
 - 3: 10,20,[10,20,30]
 - 4: undefined

Normalized calls: Same

Final output calls: Same
