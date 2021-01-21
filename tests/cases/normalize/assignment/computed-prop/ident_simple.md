# Preval test case

# ident_simple.md

> normalize > assignment > computed-prop > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
let obj = {};
obj[a = b] = 1000;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
let a = 1;
let b = 2;
let c = 3;
let obj = {};
{
  tmpAssignComputedObj = obj;
  a = b;
  tmpAssignComputedProp = b;
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
let a = 1;
let obj = {};
tmpAssignComputedObj = obj;
a = 2;
tmpAssignComputedProp = 2;
tmpAssignComputedRhs = 1000;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2,2,3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
