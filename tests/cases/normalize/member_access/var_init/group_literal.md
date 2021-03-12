# Preval test case

# group_literal.md

> Normalize > Member access > Var init > Group literal
>
> We shouldn't transform member expressions on group ending in a literal

#TODO

## Input

`````js filename=intro
let x = ($(1), 2).foo;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = ($(1), 2).foo;
$(x);
`````

## Normalized

`````js filename=intro
$(1);
const tmpCompObj = 2;
let x = tmpCompObj.foo;
$(x);
`````

## Output

`````js filename=intro
$(1);
const x = (2).foo;
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
