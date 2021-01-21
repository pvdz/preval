# Preval test case

# ident_member_complex_simple.md

> normalize > assignment > template > ident_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
$(`abc ${a = $(b).x = c} def`)
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpArg = `abc ${
  ((tmpNestedAssignObj = $(b)), (tmpNestedPropAssignRhs = c), (tmpNestedAssignObj.x = tmpNestedPropAssignRhs), (a = tmpNestedPropAssignRhs))
} def`;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
tmpArg = `abc ${
  ((tmpNestedAssignObj = $(b)), (tmpNestedPropAssignRhs = 3), (tmpNestedAssignObj.x = tmpNestedPropAssignRhs), (a = tmpNestedPropAssignRhs))
} def`;
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":3}
 - 1: "abc 3 def"
 - 2: 3,{"x":3},3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
