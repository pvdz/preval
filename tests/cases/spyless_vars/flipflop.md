# Preval test case

# flipflop.md

> Spyless vars > Flipflop
>
> Example case of two statements that flip-flop when spyless vars is applied incorrectly.
> This can end up being an infinite transform loop.
> (This may end up superseded by a rule that knows things can't be instanceof / in of NaN ...)

## Input

`````js filename=intro
const x = {};
const a = x in NaN;           // This one probably ought to end up after b because it is used (evaluated) before b
const b = x instanceof NaN;
const arr = [a, b];
$(arr);
`````

## Pre Normal


`````js filename=intro
const x = {};
const a = x in NaN;
const b = x instanceof NaN;
const arr = [a, b];
$(arr);
`````

## Normalized


`````js filename=intro
const x = {};
const a = x in NaN;
const b = x instanceof NaN;
const arr = [a, b];
$(arr);
`````

## Output


`````js filename=intro
const x = {};
const a = x in NaN;
const b = x instanceof NaN;
const arr = [a, b];
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = a in NaN;
const c = a instanceof NaN;
const d = [ b, c ];
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot use 'in' operator to search for '#<Object>' in NaN ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
