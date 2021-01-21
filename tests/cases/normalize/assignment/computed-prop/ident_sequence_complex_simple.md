# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
obj[a = ($(b), $(c)).x = c] = 1000;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
let a = 1;
let b = 2;
let c = 3;
{
  tmpAssignComputedObj = obj;
  $(b);
  tmpNestedAssignObj = $(c);
  tmpNestedAssignObj.x = c;
  tmpNestedComplexRhs = c;
  a = tmpNestedComplexRhs;
  tmpAssignComputedProp = tmpNestedComplexRhs;
  tmpAssignComputedRhs = 1000;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
let a = 1;
tmpAssignComputedObj = obj;
$(2);
tmpNestedAssignObj = $(3);
tmpNestedAssignObj.x = 3;
tmpNestedComplexRhs = 3;
a = tmpNestedComplexRhs;
tmpAssignComputedProp = tmpNestedComplexRhs;
tmpAssignComputedRhs = 1000;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same