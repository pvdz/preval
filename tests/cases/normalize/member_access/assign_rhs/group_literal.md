# Preval test case

# group_literal.md

> Normalize > Member access > Assign rhs > Group literal
>
> We shouldn't transform member expressions on group ending in a literal

#TODO

## Input

`````js filename=intro
let x = 10;
x = ($(1), 2).foo;
$(x);
`````

## Normalized

`````js filename=intro
let x = 10;
$(1);
const tmpAssignRhsProp = 2;
x = tmpAssignRhsProp.foo;
$(x);
`````

## Output

`````js filename=intro
$(1);
const SSA_x = (2).foo;
$(SSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
