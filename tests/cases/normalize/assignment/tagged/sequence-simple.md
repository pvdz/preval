# Preval test case

# sequence-simple.md

> normalize > assignment > tagged > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
$`abc ${(a, b).c = d} def`;
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
tmpArg = ['abc ', ' def'];
a;
tmpNestedAssignObj = b;
tmpNestedAssignObj.c = d;
tmpArg_1 = d;
$(tmpArg, tmpArg_1);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedAssignObj;
let b = { c: 2 };
tmpArg = ['abc ', ' def'];
tmpNestedAssignObj = b;
tmpNestedAssignObj.c = 3;
tmpArg_1 = 3;
$(tmpArg, tmpArg_1);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: ["abc "," def"],3
 - 1: 1,{"c":3},"unused",3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
