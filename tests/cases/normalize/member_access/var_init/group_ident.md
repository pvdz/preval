# Preval test case

# group_ident.md

> Normalize > Member access > Var init > Group ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
let x = ($(1), $).length;
$(x);
`````

## Pre Normal


`````js filename=intro
let x = ($(1), $).length;
$(x);
`````

## Normalized


`````js filename=intro
$(1);
const tmpCompObj = $;
let x = tmpCompObj.length;
$(x);
`````

## Output


`````js filename=intro
$(1);
const x /*:unknown*/ = $.length;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $.length;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
