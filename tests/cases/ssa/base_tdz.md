# Preval test case

# base_tdz.md

> Ssa > Base tdz
>
> Contrived example

This is a tdz example we can detect safely

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
$($throwTDZError(`Preval: TDZ triggered for this read: \$(x)`));
let x = $(5);
$(x);
x = $(10);
$(x);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
throw `Preval: TDZ triggered for this read: \$(x)`;
let x = 0;
`````

## Output


`````js filename=intro
throw `Preval: TDZ triggered for this read: \$(x)`;
`````

## PST Output

With rename=true

`````js filename=intro
throw "Preval: TDZ triggered for this read: $(x)";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
