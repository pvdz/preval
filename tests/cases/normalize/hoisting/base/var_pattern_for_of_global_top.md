# Preval test case

# var_pattern_for_of_global_top.md

> Normalize > Hoisting > Base > Var pattern for of global top
>
> Hosting in a block should end up in the parent

#TODO

## Input

`````js filename=intro
$(x);
for (var [x] of [[100]]) $(x, 'for');
$(x);
`````

## Normalized

`````js filename=intro
var x;
$(x);
const tmpArrElement = [100];
const tmpForOfRhs = [tmpArrElement];
let tmpForOfLhsNode;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const arrAssignPatternRhs = tmpForOfLhsNode;
  const arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  $(x, 'for');
}
$(x);
`````

## Output

`````js filename=intro
var x;
$(x);
const tmpArrElement = [100];
const tmpForOfRhs = [tmpArrElement];
let tmpForOfLhsNode;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const arrAssignPatternRhs = tmpForOfLhsNode;
  const arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  $(x, 'for');
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 100, 'for'
 - 3: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
