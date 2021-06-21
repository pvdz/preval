# Preval test case

# and_x_eq_y.md

> Bit hacks > And x if > And x eq y
>
> Meh

#TODO

## Input

`````js filename=intro
const x = $(32768);
const y = x & 32768;
const z = y === 32; // must be false because y can only be 32768 or 0. Arguably a flag for a bug.
$(z);
`````

## Pre Normal

`````js filename=intro
const x = $(32768);
const y = x & 32768;
const z = y === 32;
$(z);
`````

## Normalized

`````js filename=intro
const x = $(32768);
const y = x & 32768;
const z = y === 32;
$(z);
`````

## Output

`````js filename=intro
const x = $(32768);
x & 32768;
$(false);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 32768
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
