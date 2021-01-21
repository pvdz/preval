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
let a = 1;
let b = { x: 2 };
let c = 3;
tmpArg = `abc ${((tmpNestedAssignObj = $(b)), (tmpNestedAssignObj.x = c), (a = c))} def`;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
let a = 1;
let b = { x: 2 };
tmpArg = `abc ${((tmpNestedAssignObj = $(b)), (tmpNestedAssignObj.x = 3), (a = 3))} def`;
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: <crash[ Cannot set property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same
