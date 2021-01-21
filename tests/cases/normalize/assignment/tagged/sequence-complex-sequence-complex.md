# Preval test case

# sequence-complex-sequence-complex.md

> normalize > assignment > tagged > sequence-complex-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
$`abc ${(a, $(b)).c = (a, $(b)).c = d} def`;
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
tmpArg = ['abc ', ' def'];
a;
tmpNestedAssignMemberObj = $(b);
a;
tmpNestedAssignObj = $(b);
tmpNestedAssignObj.c = d;
tmpNestedAssignMemberRhs = d;
tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
tmpArg_1 = tmpNestedAssignMemberRhs;
$(tmpArg, tmpArg_1);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let b = { c: 2 };
tmpArg = ['abc ', ' def'];
tmpNestedAssignMemberObj = $(b);
tmpNestedAssignObj = $(b);
tmpNestedAssignObj.c = 3;
tmpNestedAssignMemberRhs = 3;
tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
tmpArg_1 = tmpNestedAssignMemberRhs;
$(tmpArg, tmpArg_1);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: {"c":3}
 - 2: ["abc "," def"],3
 - 3: 1,{"c":3},"unused",3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
