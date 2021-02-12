# Preval test case

# global_group_literal.md

> normalize > member_access > global_group_literal
>
> We shouldn't transform member expressions on group ending in a literal

#TODO

## Input

`````js filename=intro
($(1), 2).foo;
`````

## Normalized

`````js filename=intro
$(1);
const tmpCompObj = 2;
tmpCompObj.foo;
`````

## Output

`````js filename=intro
$(1);
const tmpCompObj = 2;
tmpCompObj.foo;
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
