# Preval test case

# trapped_break.md

> Tofix > trapped break
>
> Breaks can't possibly throw

## Input

`````js filename=intro
let x = 1;
$inlinedFunction: {
  try {
    break $inlinedFunction;
  } catch (e) {}
  x = 2;
}
$(x); // x=1
`````

## Pre Normal


`````js filename=intro
let x = 1;
$inlinedFunction: {
  try {
    break $inlinedFunction;
  } catch (e) {}
  x = 2;
}
$(x);
`````

## Normalized


`````js filename=intro
let x = 1;
$(x);
`````

## Output


`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
