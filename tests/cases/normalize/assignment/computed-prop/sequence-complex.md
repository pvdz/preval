# Preval test case

# sequence-complex.md

> normalize > assignment > stmt > sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
obj[(a, $(b)).c = d] = 1000;
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
{
  tmpAssignComputedObj = obj;
  a;
  tmpNestedAssignObj = $(b);
  tmpNestedAssignObj.c = d;
  tmpAssignComputedProp = d;
  tmpAssignComputedRhs = 1000;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpNestedAssignObj;
let b = { c: 2 };
tmpAssignComputedObj = obj;
tmpNestedAssignObj = $(b);
tmpNestedAssignObj.c = 3;
tmpAssignComputedProp = 3;
tmpAssignComputedRhs = 1000;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same
