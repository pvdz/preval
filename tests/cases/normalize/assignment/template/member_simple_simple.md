# Preval test case

# member_simple_simple.md

> normalize > assignment > template > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(`abc ${a.x = b} def`)
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTemplateExpr;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedPropAssignRhs = b;
a.x = tmpNestedPropAssignRhs;
tmpTemplateExpr = tmpNestedPropAssignRhs;
tmpArg = `abc ${tmpTemplateExpr} def`;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTemplateExpr;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
tmpNestedPropAssignRhs = 2;
a.x = tmpNestedPropAssignRhs;
tmpTemplateExpr = tmpNestedPropAssignRhs;
tmpArg = `abc ${tmpTemplateExpr} def`;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: "abc 2 def"
 - 1: {"x":2},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
