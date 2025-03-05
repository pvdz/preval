# Preval test case

# with_stmt.md

> Array reads > With stmt
>
> Inlining array properties

## Input

`````js filename=intro
const arr = [1, 2, 3];
$('distraction');
$(arr[0]);
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
$(`distraction`);
$(arr[0]);
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
$(`distraction`);
const tmpCalleeParam = arr[0];
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`distraction`);
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( "distraction" );
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'distraction'
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
