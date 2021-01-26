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
const tmpCalleeParam = (2).foo;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
$(1);
const tmpCalleeParam = (2).foo;
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
