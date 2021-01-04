# Preval test case

# global_group_literal.md

> normalize > member_access > global_group_literal
>
> We shouldn't transform member expressions on group ending in a literal

#TODO

## Input

`````js filename=intro
const y = (1, 2, 3).foo
$(y);
`````

## Normalized

`````js filename=intro
1;
const tmpPseudoExprStmt = 2;
const y = (3).foo;
$(y);
`````

## Output

`````js filename=intro
const y = (3).foo;
$(y);
`````
