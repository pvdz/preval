# Preval test case

# bool_eq_string.md

> Typed comparison > Bool eq string
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = Boolean($(false));
const y = x === "";
$('out:', y);
`````

## Pre Normal


`````js filename=intro
const x = Boolean($(false));
const y = x === ``;
$(`out:`, y);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = $(false);
const x = Boolean(tmpCalleeParam);
const y = x === ``;
$(`out:`, y);
`````

## Output


`````js filename=intro
$(false);
$(`out:`, false);
`````

## PST Output

With rename=true

`````js filename=intro
$( false );
$( "out:", false );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
