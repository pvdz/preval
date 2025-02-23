# Preval test case

# complex_callee.md

> Normalize > New > Complex callee
>
> The `new` operator should apply to a single identifier. A literal can also work though it would lead to a runtime error.

## Input

`````js filename=intro
$(new ($()));
`````

## Pre Normal


`````js filename=intro
$(new ($())());
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpNewCallee = $();
const tmpCalleeParam = new tmpNewCallee();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $();
const tmpCalleeParam /*:object*/ = new tmpNewCallee();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
const b = new a();
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: ('<crash[ <ref> is not a constructor ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
