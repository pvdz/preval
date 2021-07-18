# Preval test case

# base.md

> Bit hacks > And and > Base
>
> If a value is orred to two primitives, you can at least safely merge those primitive.

#TODO

## Input

`````js filename=intro
const a = $(0);
const b = a & 48;
const c = b & 32;
$(c);
`````

## Pre Normal

`````js filename=intro
const a = $(0);
const b = a & 48;
const c = b & 32;
$(c);
`````

## Normalized

`````js filename=intro
const a = $(0);
const b = a & 48;
const c = b & 32;
$(c);
`````

## Output

`````js filename=intro
const a = $(0);
const b = a & 32;
$(b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
