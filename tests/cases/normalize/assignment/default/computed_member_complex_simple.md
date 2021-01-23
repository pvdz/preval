# Preval test case

# computed_member_complex_simple.md

> normalize > assignment > default > computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
switch ($('a')) { default: $(a)[$('x')] = b; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignMemLhsObj;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  const tmpSwitchTest = $('a');
  {
    let tmpFallthrough = false;
    {
      ('default case:');
      tmpAssignMemLhsObj = $(a);
      tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
      tmpAssignComMemLhsProp = $('x');
      tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = b;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignMemLhsObj;
let a = { x: 10 };
$('a');
tmpAssignMemLhsObj = $(a);
tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
tmpAssignComMemLhsProp = $('x');
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: {"x":2}
 - 2: "x"
 - 3: {"x":2},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
