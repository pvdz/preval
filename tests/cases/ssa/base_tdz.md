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
$($throwTDZError(`TDZ triggered for this read: \$(x)`));
let x = $(5);
$(x);
x = $(10);
$(x);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = $throwTDZError(`TDZ triggered for this read: \$(x)`);
tmpCallCallee(tmpCalleeParam);
let x = $(5);
$(x);
x = $(10);
$(x);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $throwTDZError(`TDZ triggered for this read: \$(x)`);
$(tmpCalleeParam);
let x = $(5);
$(x);
x = $(10);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = b( "TDZ triggered for this read: $(x)" );
$( a );
let c = $( 5 );
$( c );
c = $( 10 );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
