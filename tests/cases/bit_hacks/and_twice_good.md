# Preval test case

# and_twice_good.md

> Bit hacks > And twice good
>
> Silly case that might happen in the IR

#TODO

## Input

`````js filename=intro
const x = $(100) & 32;
$(x);
const y = x & 32; // Redundant
$(y);
`````

## Pre Normal

`````js filename=intro
const x = $(100) & 32;
$(x);
const y = x & 32;
$(y);
`````

## Normalized

`````js filename=intro
const tmpBinLhs = $(100);
const x = tmpBinLhs & 32;
$(x);
const y = x & 32;
$(y);
`````

## Output

`````js filename=intro
const tmpBinLhs = $(100);
const x = tmpBinLhs & 32;
$(x);
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 32
 - 3: 32
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
