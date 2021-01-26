# Preval test case

# global_group_literal.md

> normalize > member_access > global_group_literal
>
> We shouldn't transform member expressions on group ending in a literal

#TODO

## Input

`````js filename=intro
let x = ($(1), 2).foo;
$(x);
`````

## Normalized

`````js filename=intro
$(1);
let x = (2).foo;
$(x);
`````

## Output

`````js filename=intro
$(1);
let x = (2).foo;
$(x);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
