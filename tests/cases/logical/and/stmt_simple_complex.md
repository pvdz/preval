# Preval test case

# stmt_simple_complex.md

> Logical > And > Stmt simple complex
>
> Logical ops need to be normalized

## Input

`````js filename=intro
1 && $(2);
`````

## Pre Normal


`````js filename=intro
1 && $(2);
`````

## Normalized


`````js filename=intro
$(2);
`````

## Output


`````js filename=intro
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
