# Preval test case

# ident_member_complex_simple.md

> normalize > assignment > default > ident_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
switch ($('a')) { default: a = $(b).x = c; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
{
  const tmpSwitchTest = $('a');
  {
    let tmpFallthrough = false;
    {
      ('default case:');
      tmpNestedAssignObj = $(b);
      tmpNestedPropAssignRhs = c;
      tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
      a = tmpNestedPropAssignRhs;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
$('a');
tmpNestedAssignObj = $(b);
tmpNestedPropAssignRhs = 3;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: {"x":3}
 - 2: 3,{"x":3},3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
