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
tmpNestedAssignObj = $(a);
tmpNestedAssignObj.length = b;
tmpArg = b;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
tmpNestedAssignObj = $(a);
tmpNestedAssignObj.length = b;
tmpArg = b;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: [10,20,30]
 - 1: <crash[ Cannot set property 'length' of undefined ]>

Normalized calls: Same

Final output calls: Same
