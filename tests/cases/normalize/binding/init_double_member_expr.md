# Preval test case

# init_double_member_expr.md

> normalize > binding > init_double_member_expr
>
> Binding declaration with a long init should be outlined

#TODO

## Input

`````js filename=intro
let x = "foo".length.toString;
$(x);
`````

## Normalized

`````js filename=intro
let tmpBindingInit = 'foo'.length;
let x = tmpBindingInit.toString;
$(x);
`````

## Uniformed

`````js filename=intro
var x = 'str'.x;
var x = x.x;
x(x);
`````

## Output

`````js filename=intro
let tmpBindingInit = 'foo'.length;
let x = tmpBindingInit.toString;
$(x);
`````
