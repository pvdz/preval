# Preval test case

# ident_member_simple_simple.md

> normalize > assignment > default > ident_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
switch ($('a')) { default: a = b.x = c; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
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
      tmpNestedPropAssignRhs = c;
      b.x = tmpNestedPropAssignRhs;
      a = tmpNestedPropAssignRhs;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
$('a');
tmpNestedPropAssignRhs = 3;
b.x = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: 3,{"x":3},3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
