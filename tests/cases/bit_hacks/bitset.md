# Preval test case

# bitset.md

> Bit hacks > Bitset
>
> Testing if one specific bit is set

#TODO

## Input

`````js filename=intro
const x = $(1234);
const y = x & 2;
const z = y === 2;
$(x, y, z);
`````

## Pre Normal

`````js filename=intro
const x = $(1234);
const y = x & 2;
const z = y === 2;
$(x, y, z);
`````

## Normalized

`````js filename=intro
const x = $(1234);
const y = x & 2;
const z = y === 2;
$(x, y, z);
`````

## Output

`````js filename=intro
const x = $(1234);
const y = x & 2;
const z = y === 2;
$(x, y, z);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1234
 - 2: 1234, 2, true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
