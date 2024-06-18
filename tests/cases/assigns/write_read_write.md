# Preval test case

# write_read_write.md

> Assigns > Write read write
>
> Testing binding mutation optimizations

## Input

`````js filename=intro
let x = $(1);
$(x);
x = $(2);
$(x);
x = $('redundant'); // This assignment should be dropped (but the expression is kept)
`````

## Pre Normal


`````js filename=intro
let x = $(1);
$(x);
x = $(2);
$(x);
x = $(`redundant`);
`````

## Normalized


`````js filename=intro
let x = $(1);
$(x);
x = $(2);
$(x);
x = $(`redundant`);
`````

## Output


`````js filename=intro
const x = $(1);
$(x);
const tmpClusterSSA_x = $(2);
$(tmpClusterSSA_x);
$(`redundant`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
const b = $( 2 );
$( b );
$( "redundant" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 'redundant'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
