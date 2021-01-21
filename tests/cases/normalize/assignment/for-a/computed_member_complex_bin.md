# Preval test case

# computed_member_complex_bin.md

> normalize > assignment > for-a > computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
for ($(a)[$('x')] = b + c;false;);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  {
    tmpAssignComputedObj = $(a);
    tmpAssignComputedProp = $('x');
    tmpAssignComputedRhs = b + c;
    tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  }
  while (false) {}
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
let a = { x: 10 };
tmpAssignComputedObj = $(a);
tmpAssignComputedProp = $('x');
tmpAssignComputedRhs = 5;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
while (false) {}
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":10}
 - 1: "x"
 - 2: <crash[ Cannot set property 'undefined' of undefined ]>

Normalized calls: Same

Final output calls: Same
