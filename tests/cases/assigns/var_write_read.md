# Preval test case

# var_write_read.md

> Assigns > Var write read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
var x;
$(1);
x = $(2); // This should become a constant
$(x, 'out');
`````

## Pre Normal


`````js filename=intro
let x = undefined;
$(1);
x = $(2);
$(x, `out`);
`````

## Normalized


`````js filename=intro
let x = undefined;
$(1);
x = $(2);
$(x, `out`);
`````

## Output


`````js filename=intro
$(1);
const x /*:unknown*/ = $(2);
$(x, `out`);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
$( a, "out" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2, 'out'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
