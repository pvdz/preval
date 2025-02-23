# Preval test case

# complex_callee_simple_args.md

> Normalize > Call > Complex callee simple args
>
> Calls should have simple idents

## Input

`````js filename=intro
$($)(1, 2);
`````

## Pre Normal


`````js filename=intro
$($)(1, 2);
`````

## Normalized


`````js filename=intro
const tmpCallComplexCallee = $($);
tmpCallComplexCallee(1, 2);
`````

## Output


`````js filename=intro
const tmpCallComplexCallee /*:unknown*/ = $($);
tmpCallComplexCallee(1, 2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
a( 1, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
