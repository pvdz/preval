# Preval test case

# prefix_plus_unknown.md

> Normalize > Update > Prefix plus unknown
>
> Update expressions should be transformed to regular binary expression assignments

## Input

`````js filename=intro
let x = $(1);
$(++x);
`````

## Pre Normal


`````js filename=intro
let x = $(1);
$(++x);
`````

## Normalized


`````js filename=intro
let x = $(1);
x = x + 1;
let tmpCalleeParam = x;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(1);
const tmpClusterSSA_x /*:primitive*/ = x + 1;
$(tmpClusterSSA_x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = a + 1;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
