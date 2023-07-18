# Preval test case

# group_call.md

> Normalize > Member access > Var init > Group call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
let x = ($(1), $(2), $($)).length;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = ($(1), $(2), $($)).length;
$(x);
`````

## Normalized

`````js filename=intro
$(1);
$(2);
const tmpCompObj = $($);
let x = tmpCompObj.length;
$(x);
`````

## Output

`````js filename=intro
$(1);
$(2);
const tmpCompObj = $($);
const x = tmpCompObj.length;
$(x);
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
