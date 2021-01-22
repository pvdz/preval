# Preval test case

# sequence-complex.md

> normalize > assignment > stmt > sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
$(`abc ${(a, $(b)).c = d} def`);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTemplateExpr;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
a;
tmpNestedAssignObj = $(b);
tmpNestedPropAssignRhs = d;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpTemplateExpr = tmpNestedPropAssignRhs;
tmpArg = `abc ${tmpTemplateExpr} def`;
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTemplateExpr;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let b = { c: 2 };
tmpNestedAssignObj = $(b);
tmpNestedPropAssignRhs = 3;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpTemplateExpr = tmpNestedPropAssignRhs;
tmpArg = `abc ${tmpTemplateExpr} def`;
$(tmpArg);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: "abc 3 def"
 - 2: 1,{"c":3},"unused",3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
