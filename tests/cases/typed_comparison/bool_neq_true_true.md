# Preval test case

# bool_neq_true_true.md

> Typed comparison > Bool neq true true
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

#TODO

## Input

`````js filename=intro
const x = Boolean($(true));
const y = x !== true;
$('out:', y);
`````

## Pre Normal

`````js filename=intro
const x = Boolean($(true));
const y = x !== true;
$(`out:`, y);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = Boolean;
const tmpCalleeParam = $(true);
const x = tmpCallCallee(tmpCalleeParam);
const y = x !== true;
$(`out:`, y);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(true);
const x = Boolean(tmpCalleeParam);
const y = !x;
$(`out:`, y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
const b = Boolean( a );
const c = !b;
$( "out:", c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
