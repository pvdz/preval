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

## Output

`````js filename=intro
let tmpBindingInit = 'foo'.length;
let x = tmpBindingInit.toString;
$(x);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
