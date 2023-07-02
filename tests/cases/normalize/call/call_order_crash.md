# Preval test case

# call_order_crash.md

> Normalize > Call > Call order crash
>
> A builtin with too many args that is a statement...

#TODO

## Input

`````js filename=intro
crash($spy('a'), $spy('b'), $spy('c'));
`````

## Pre Normal

`````js filename=intro
crash($spy(`a`), $spy(`b`), $spy(`c`));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = crash;
const tmpCalleeParam = $spy(`a`);
const tmpCalleeParam$1 = $spy(`b`);
const tmpCalleeParam$3 = $spy(`c`);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
`````

## Output

`````js filename=intro
crash;
const tmpCalleeParam = $spy(`a`);
const tmpCalleeParam$1 = $spy(`b`);
const tmpCalleeParam$3 = $spy(`c`);
crash(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
`````

## Globals

BAD@! Found 1 implicit global bindings:

crash

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
