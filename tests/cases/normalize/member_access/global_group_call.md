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
1;
2;
const tmpBindingInit = $();
const y = tmpBindingInit.foo;
$(y);
`````

## Uniformed

`````js filename=intro
8;
8;
var x = x();
var x = x.x;
x(x);
`````

## Output

`````js filename=intro
const tmpBindingInit = $();
const y = tmpBindingInit.foo;
$(y);
`````
