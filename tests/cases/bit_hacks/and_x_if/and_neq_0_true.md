# Preval test case

# and_neq_0_true.md

> Bit hacks > And x if > And neq 0 true
>
> Meh

#TODO

## Input

`````js filename=intro
const x = +$(1);
const y = x & 32768;
const z = y !== 0; // true
$(z);
`````

## Pre Normal

`````js filename=intro
const x = +$(1);
const y = x & 32768;
const z = y !== 0;
$(z);
`````

## Normalized

`````js filename=intro
const tmpUnaryArg = $(1);
const x = +tmpUnaryArg;
const y = x & 32768;
const z = y !== 0;
$(z);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(1);
const x = +tmpUnaryArg;
const y = x & 32768;
const z = Boolean(y);
$(z);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same