# Preval test case

# global_call_prop.md

> normalize > member_access > global_call_prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
$(parseInt(15).foo);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpComplexMemberObj;
tmpComplexMemberObj = parseInt(15);
tmpArg = tmpComplexMemberObj.foo;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = x(8);
x = x.x;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpComplexMemberObj;
tmpComplexMemberObj = parseInt(15);
tmpArg = tmpComplexMemberObj.foo;
$(tmpArg);
`````
