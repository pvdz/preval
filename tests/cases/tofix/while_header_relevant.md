# Preval test case

# while_header_relevant.md

> Tofix > While header relevant
>
> While elimination should keep while condition.
> This was a regression where the while condition would throw but because it
> was eliminated the throw didn't happen.

## Input

`````js filename=intro
let y = 1;
while ($LOOP_UNROLL_500) {
  y = y + 1;
  break;
}
`````

## Pre Normal


`````js filename=intro
let y = 1;
while ($LOOP_UNROLL_500) {
  y = y + 1;
  break;
}
`````

## Normalized


`````js filename=intro
let y = 1;
y = y + 1;
`````

## Output


`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: BAD?!
 - eval returned: undefined

Final output calls: BAD!!
 - eval returned: undefined
