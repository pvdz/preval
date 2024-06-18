# Preval test case

# base.md

> Ssa > Base
>
> Contrived example

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
const x = $(5);
$(x);
const tmpClusterSSA_x = $(10);
$(tmpClusterSSA_x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 5 );
$( a );
const b = $( 10 );
$( b );
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
