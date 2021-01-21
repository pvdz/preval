# Preval test case

# computed_member_simple_simple.md

> normalize > assignment > default > computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
switch ($('a')) { default: a[$('x')] = b; }
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
  const tmpSwitchTest = $('a');
  {
    let tmpFallthrough = false;
    {
      ('default case:');
      {
        tmpAssignComputedObj = a;
        tmpAssignComputedProp = $('x');
        tmpAssignComputedRhs = b;
        tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
      }
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
let a = { x: 10 };
$('a');
tmpAssignComputedObj = a;
tmpAssignComputedProp = $('x');
tmpAssignComputedRhs = 2;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: "x"
 - 2: {"x":10,"undefined":2},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same