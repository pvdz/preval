# Preval test case

# member_complex_simple.md

> normalize > assignment > default > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
switch ($('a')) { default: $(a).x = b; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
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
        tmpAssignMemLhsObj = $(a);
        tmpAssignMemRhs = b;
        tmpAssignMemLhsObj.x = tmpAssignMemRhs;
      }
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let a = { x: 10 };
$('a');
tmpAssignMemLhsObj = $(a);
tmpAssignMemRhs = 2;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: {"x":10}
 - 2: <crash[ Cannot set property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same
