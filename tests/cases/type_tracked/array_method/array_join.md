# Preval test case

# array_join.md

> Type tracked > Array method > Array join
>
>

## Input

`````js filename=intro
const _0x11B59/*:array*/ = [`u`, `s`, `e`, ` `, `s`, `t`, `r`, `i`, `c`, `t`, `%`, `_`, `_`, `e`, `x`, `t`, `e`, `n`, `d`, `s`];
const tmpCallObj$11 = _0x11B59.join(``);
const tmpCallObj$9 = tmpCallObj$11.split(`%`);
const tmpCallObj$7 = tmpCallObj$9.join(`^`);
const tmpCallObj$5 = tmpCallObj$7.split(`#1`);
const tmpCallObj$3 = tmpCallObj$5.join(`%`);
const tmpCallObj$1 = tmpCallObj$3.split(`#0`);
const tmpCallObj = tmpCallObj$1.join(`#`);
const tmpReturnArg = tmpCallObj.split(`^`);
$(tmpReturnArg);
`````

## Pre Normal


`````js filename=intro
const _0x11B59 = [`u`, `s`, `e`, ` `, `s`, `t`, `r`, `i`, `c`, `t`, `%`, `_`, `_`, `e`, `x`, `t`, `e`, `n`, `d`, `s`];
const tmpCallObj$11 = _0x11B59.join(``);
const tmpCallObj$9 = tmpCallObj$11.split(`%`);
const tmpCallObj$7 = tmpCallObj$9.join(`^`);
const tmpCallObj$5 = tmpCallObj$7.split(`#1`);
const tmpCallObj$3 = tmpCallObj$5.join(`%`);
const tmpCallObj$1 = tmpCallObj$3.split(`#0`);
const tmpCallObj = tmpCallObj$1.join(`#`);
const tmpReturnArg = tmpCallObj.split(`^`);
$(tmpReturnArg);
`````

## Normalized


`````js filename=intro
const _0x11B59 = [`u`, `s`, `e`, ` `, `s`, `t`, `r`, `i`, `c`, `t`, `%`, `_`, `_`, `e`, `x`, `t`, `e`, `n`, `d`, `s`];
const tmpCallObj$11 = _0x11B59.join(``);
const tmpCallObj$9 = tmpCallObj$11.split(`%`);
const tmpCallObj$7 = tmpCallObj$9.join(`^`);
const tmpCallObj$5 = tmpCallObj$7.split(`#1`);
const tmpCallObj$3 = tmpCallObj$5.join(`%`);
const tmpCallObj$1 = tmpCallObj$3.split(`#0`);
const tmpCallObj = tmpCallObj$1.join(`#`);
const tmpReturnArg = tmpCallObj.split(`^`);
$(tmpReturnArg);
`````

## Output


`````js filename=intro
const tmpReturnArg /*:array*/ = [`use strict`, `__extends`];
$(tmpReturnArg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "use strict", "__extends" ];
$( a );
`````

## Denormalized

(This ought to be the final result)


`````js filename=intro
$([`use strict`, `__extends`]);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['use strict', '__extends']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
