# Preval test case

# computed_member_complex_simple.md

> normalize > assignment > for-let > computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
for (let wat = $(a)[$('x')] = b; false;);
$(wat);
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
    tmpAssignComputedRhs = b;
    tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  }
  let wat_1 = b;
  while (false) {}
}
$(wat_1);
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
tmpAssignComputedRhs = 2;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
while (false) {}
$(2);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":10}
 - 1: "x"
 - 2: <crash[ Cannot set property 'undefined' of undefined ]>

Normalized calls: Same

Final output calls: Same
