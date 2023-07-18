# Preval test case

# group_ident.md

> Normalize > Member access > Call arg > Group ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
$(($(1), $).length);
`````

## Pre Normal

`````js filename=intro
$(($(1), $).length);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
$(1);
const tmpCompObj = $;
const tmpCalleeParam = tmpCompObj.length;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
const tmpCalleeParam = $.length;
$(tmpCalleeParam);
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
