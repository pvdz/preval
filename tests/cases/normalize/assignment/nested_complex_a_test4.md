# Preval test case

# nested_complex_a.md

> normalize > assignment > nested_complex_a
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
//var a = [], b = 20, c = 30;
//$($(a).length);
$($(a).length = b);
//$(a).length = b;
//$($(a).length = b = c);
//$($(a).length);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
tmpNestedAssignObj = $(a);
tmpNestedPropAssignRhs = b;
tmpNestedAssignObj.length = tmpNestedPropAssignRhs;
tmpArg = tmpNestedPropAssignRhs;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
tmpNestedAssignObj = $(a);
tmpNestedPropAssignRhs = b;
tmpNestedAssignObj.length = tmpNestedPropAssignRhs;
tmpArg = tmpNestedPropAssignRhs;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: [10,20,30,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
 - 1: 20
 - 2: undefined

Normalized calls: Same

Final output calls: Same
