# Preval test case

# base_tdz.md

> Ssa > Base tdz
>
> Contrived example

This is a tdz example we can detect safely

#TODO

## Input

`````js filename=intro
$(x);
let x = $(5);
$(x);
// Next write can be SSA'd
x = $(10);
$(x);
`````

## Pre Normal

`````js filename=intro
$(x);
let x = $(5);
$(x);
x = $(10);
$(x);
`````

## Normalized

`````js filename=intro
$(x);
let x = $(5);
$(x);
x = $(10);
$(x);
`````

## Output

`````js filename=intro
$(x);
const x = $(5);
$(x);
const tmpSSA_x = $(10);
$(tmpSSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
