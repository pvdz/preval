# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
if (a = ($(b), $(c)).x = c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
let a = 1;
let b = 2;
let c = 3;
$(b);
tmpNestedAssignObj = $(c);
tmpNestedAssignObj.x = c;
a = c;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignObj;
let a = 1;
$(2);
tmpNestedAssignObj = $(3);
tmpNestedAssignObj.x = 3;
a = 3;
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 3
 - 2: <crash[ Cannot set property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same
