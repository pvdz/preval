# Preval test case

# flipflop3.md

> Spyless vars > Flipflop3
>
> Example case of two statements that flip-flop when spyless vars is applied incorrectly.
> This can end up being an infinite transform loop.
> (This may end up superseded by a rule that knows things can't be instanceof / in of NaN ...)

## Input

`````js filename=intro
const x = {};
const a = x instanceof String;
const b = x instanceof Function;
const c = x instanceof Array;
const arr = [a, b, c];
$(arr);
`````

## Pre Normal


`````js filename=intro
const x = {};
const a = x instanceof String;
const b = x instanceof Function;
const c = x instanceof Array;
const arr = [a, b, c];
$(arr);
`````

## Normalized


`````js filename=intro
const x = {};
const a = x instanceof String;
const b = x instanceof Function;
const c = x instanceof Array;
const arr = [a, b, c];
$(arr);
`````

## Output


`````js filename=intro
const x = {};
const a = x instanceof String;
const b = x instanceof Function;
const c = x instanceof Array;
const arr = [a, b, c];
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = a instanceof String;
const c = a instanceof Function;
const d = a instanceof Array;
const e = [ b, c, d ];
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [false, false, false]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
