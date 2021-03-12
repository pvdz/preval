# Preval test case

# var_pattern_for_in_global_top.md

> Normalize > Hoisting > Base > Var pattern for in global top
>
> Hosting in a block should end up in the parent

#TODO

## Input

`````js filename=intro
$(x);
for (var [x] in {y: 100}) $(x, 'for');
$(x);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
$(x);
for ([x] in { y: 100 }) $(x, 'for');
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
$(x);
const tmpForInRhs = { y: 100 };
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  const arrAssignPatternRhs = tmpForInLhsNode;
  const arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  $(x, 'for');
}
$(x);
`````

## Output

`````js filename=intro
let x = undefined;
$(x);
const tmpForInRhs = { y: 100 };
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  const arrAssignPatternRhs = tmpForInLhsNode;
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
 - 2: 'y', 'for'
 - 3: 'y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
