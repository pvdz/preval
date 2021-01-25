# Preval test case

# sequence-complex.md

> normalize > assignment > stmt > sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
switch ($('a')) { default: (a, $(b)).c = d; }
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
const tmpSwitchTest = $('a');
{
  let tmpFallthrough = false;
  {
    ('default case:');
    {
      a;
      tmpAssignMemLhsObj = $(b);
      tmpAssignMemLhsObj.c = d;
    }
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
let b = { c: 2 };
$('a');
tmpAssignMemLhsObj = $(b);
tmpAssignMemLhsObj.c = 3;
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: {"c":3}
 - 2: 1,{"c":3},"unused",3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
