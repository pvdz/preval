# Preval test case

# group_call.md

> Normalize > Member access > Statement > Global > Group call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
($(1), $(2), $($)).length;
`````

## Pre Normal


`````js filename=intro
($(1), $(2), $($)).length;
`````

## Normalized


`````js filename=intro
$(1);
$(2);
const tmpCompObj = $($);
tmpCompObj.length;
`````

## Output


`````js filename=intro
$(1);
$(2);
const tmpCompObj /*:unknown*/ = $($);
tmpCompObj.length;
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( $ );
a.length;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: '<$>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
