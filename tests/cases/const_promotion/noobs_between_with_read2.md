# Preval test case

# noobs_between_with_read2.md

> Const promotion > Noobs between with read2

## Input

`````js filename=intro
let x = $(10);
const a = x;
x = $(20);
$(x, a, `final`);
`````

## Pre Normal


`````js filename=intro
let x = $(10);
const a = x;
x = $(20);
$(x, a, `final`);
`````

## Normalized


`````js filename=intro
let x = $(10);
const a = x;
x = $(20);
$(x, a, `final`);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(10);
const tmpClusterSSA_x /*:unknown*/ = $(20);
$(tmpClusterSSA_x, x, `final`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
const b = $( 20 );
$( b, a, "final" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 20, 10, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
