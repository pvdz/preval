# Preval test case

# group_literal.md

> Normalize > Member access > Statement > Global > Group literal
>
> We shouldn't transform member expressions on group ending in a literal

#TODO

## Input

`````js filename=intro
($(1), 2).foo;
`````

## Pre Normal


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
(2).foo;
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
2.foo;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
