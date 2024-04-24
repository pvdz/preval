# Preval test case

# base_global.md

> Ssa > Base global
>
> Contrived example

#TODO

## Input

`````js filename=intro
let x = $(5);
$(x);
// Next write can be SSA'd
x = $(10);
$(x);
`````

## Pre Normal

`````js filename=intro
let x = $(5);
$(x);
x = $(10);
$(x);
`````

## Normalized

`````js filename=intro
let x = $(5);
$(x);
x = $(10);
$(x);
`````

## Output

`````js filename=intro
let x = $(5);
$(x);
x = $(10);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 5 );
$( a );
a = $( 10 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: 5
 - 3: 10
 - 4: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
