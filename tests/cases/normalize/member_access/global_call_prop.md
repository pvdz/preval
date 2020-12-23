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
var tmpObj;
$(((tmpObj = parseInt(15)), tmpObj).foo);
`````

## Output

`````js filename=intro
var tmpObj;
$(((tmpObj = parseInt(15)), tmpObj).foo);
`````
