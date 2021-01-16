# Preval test case

# global_group_ident.md

> normalize > member_access > global_group_ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
const a = {x: 1}
const y = (1, a).x
$(y);
`````

## Normalized

`````js filename=intro
const a = { x: 1 };
1;
const y = a.x;
$(y);
`````

## Output

`````js filename=intro
const a = { x: 1 };
const y = a.x;
$(y);
`````
