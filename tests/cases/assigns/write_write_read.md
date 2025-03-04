# Preval test case

# write_write_read.md

> Assigns > Write write read
>
> Testing binding mutation optimizations

## Input

`````js filename=intro
let x = $(1);
x = $(2);
$(x, 'a');
`````

## Pre Normal


`````js filename=intro
let x = $(1);
x = $(2);
$(x, `a`);
`````

## Normalized


`````js filename=intro
let x = $(1);
x = $(2);
$(x, `a`);
`````

## Output


`````js filename=intro
$(1);
const x /*:unknown*/ = $(2);
$(x, `a`);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
$( a, "a" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2, 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
