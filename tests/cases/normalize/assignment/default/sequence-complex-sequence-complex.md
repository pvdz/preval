# Preval test case

# sequence-complex-sequence-complex.md

> normalize > assignment > default > sequence-complex-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
switch ($('a')) { default: (a, $(b)).c = (a, $(b)).c = d; }
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let d = 3;
{
  const tmpSwitchTest = $('a');
  {
    let tmpFallthrough = false;
    {
      ('default case:');
      {
        a;
        {
          tmpAssignMemLhsObj = $(b);
          a;
          tmpNestedAssignObj = $(b);
          tmpNestedAssignObj.c = d;
          tmpAssignMemRhs = d;
          tmpAssignMemLhsObj.c = tmpAssignMemRhs;
        }
      }
    }
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
let b = { c: 2 };
$('a');
tmpAssignMemLhsObj = $(b);
tmpNestedAssignObj = $(b);
tmpNestedAssignObj.c = 3;
tmpAssignMemRhs = 3;
tmpAssignMemLhsObj.c = tmpAssignMemRhs;
$(1, b, c, 3);
`````

## Result

Should call `$` with:
[['a'], [{ c: 2 }], [{ c: 2 }], "<crash[ Cannot set property 'c' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
