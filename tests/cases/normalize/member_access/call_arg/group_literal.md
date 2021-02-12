# Preval test case

# global_group_literal.md

> normalize > member_access > global_group_literal
>
> We shouldn't transform member expressions on group ending in a literal

#TODO

## Input

`````js filename=intro
$(($(1), 2).foo);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
$(1);
const tmpCompObj = 2;
const tmpCalleeParam = tmpCompObj.foo;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
const tmpCalleeParam = (2).foo;
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
