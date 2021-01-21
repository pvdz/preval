# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Ident property access should not be changed

#TODO

## Input

`````js filename=intro
$(global.foo);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = global.foo;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = global.foo;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
