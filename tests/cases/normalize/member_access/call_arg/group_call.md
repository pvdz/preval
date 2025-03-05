# Preval test case

# group_call.md

> Normalize > Member access > Call arg > Group call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
$(($(1), $(2), $($)).length);
`````

## Pre Normal


`````js filename=intro
$(($(1), $(2), $($)).length);
`````

## Normalized


`````js filename=intro
$(1);
$(2);
const tmpCompObj = $($);
const tmpCalleeParam = tmpCompObj.length;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
$(2);
const tmpCompObj /*:unknown*/ = $($);
const tmpCalleeParam /*:unknown*/ = tmpCompObj.length;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( $ );
const b = a.length;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: '<$>'
 - 4: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
