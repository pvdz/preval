# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
const y = (1, 2, $()).foo
$(y);
`````

## Normalized

`````js filename=intro
var tmpObj;
const y = ((tmpObj = (1, 2, $())), tmpObj).foo;
$(y);
`````

## Output

`````js filename=intro
var tmpObj;
const y = ((tmpObj = (1, 2, $())), tmpObj).foo;
$(y);
`````
