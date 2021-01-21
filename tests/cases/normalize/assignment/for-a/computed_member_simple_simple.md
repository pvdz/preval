# Preval test case

# computed_member_simple_simple.md

> normalize > assignment > for-a > computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
for (a[$('x')] = b;false;);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  tmpAssignComMemLhsObj = a;
  tmpAssignComMemLhsProp = $('x');
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = b;
  while (false) {}
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
let a = { x: 10 };
tmpAssignComMemLhsObj = a;
tmpAssignComMemLhsProp = $('x');
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
while (false) {}
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: {"x":2},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
