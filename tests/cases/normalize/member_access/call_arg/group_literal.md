# Preval test case

# group_literal.md

> Normalize > Member access > Call arg > Group literal
>
> We shouldn't transform member expressions on group ending in a literal

#TODO

## Input

`````js filename=intro
$(($(1), 2).foo);
`````

## Pre Normal


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

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = 2.foo;
$( a );
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
