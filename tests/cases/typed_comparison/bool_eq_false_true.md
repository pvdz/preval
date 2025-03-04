# Preval test case

# bool_eq_false_true.md

> Typed comparison > Bool eq false true
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = Boolean($(false));
const y = x === true;
$('out:', y);
`````

## Pre Normal


`````js filename=intro
const x = Boolean($(false));
const y = x === true;
$(`out:`, y);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = Boolean;
const tmpCalleeParam = $(false);
const x = tmpCallCallee(tmpCalleeParam);
const y = x === true;
$(`out:`, y);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(false);
const x /*:boolean*/ = Boolean(tmpCalleeParam);
$(`out:`, x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( false );
const b = Boolean( a );
$( "out:", b );
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
