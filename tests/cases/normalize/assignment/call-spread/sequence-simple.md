# Preval test case

# sequence-simple.md

> normalize > assignment > call-spread > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
$(...( (a, b).c = d ));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
a;
tmpNestedAssignObj = b;
tmpNestedPropAssignRhs = d;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpArg = tmpNestedPropAssignRhs;
$(...tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let b = { c: 2 };
tmpNestedAssignObj = b;
tmpNestedPropAssignRhs = 3;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpArg = tmpNestedPropAssignRhs;
$(...tmpArg);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ Found non-callable @@iterator ]>

Normalized calls: Same

Final output calls: Same
