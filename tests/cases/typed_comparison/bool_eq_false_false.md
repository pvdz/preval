# Preval test case

# bool_eq_false_false.md

> Typed comparison > Bool eq false false
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

#TODO

## Input

`````js filename=intro
const x = Boolean($(false));
const y = x === false;
$('out:', y);
`````

## Pre Normal

`````js filename=intro
const x = Boolean($(false));
const y = x === false;
$(`out:`, y);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = Boolean;
const tmpCalleeParam = $(false);
const x = tmpCallCallee(tmpCalleeParam);
const y = x === false;
$(`out:`, y);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(false);
const x = Boolean(tmpCalleeParam);
const y = !x;
$(`out:`, y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( false );
const b = Boolean( a );
const c = !b;
$( "out:", c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: 'out:', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
