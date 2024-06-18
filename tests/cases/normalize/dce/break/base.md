# Preval test case

# base.md

> Normalize > Dce > Break > Base
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
while ($(true)) break;
$('after');
`````

## Pre Normal


`````js filename=intro
while ($(true)) break;
$(`after`);
`````

## Normalized


`````js filename=intro
const tmpUnaryArg = $(true);
let tmpIfTest = !tmpUnaryArg;
while (true) {
  if (tmpIfTest) {
    break;
  } else {
    break;
  }
}
$(`after`);
`````

## Output


`````js filename=intro
$(true);
$(`after`);
`````

## PST Output

With rename=true

`````js filename=intro
$( true );
$( "after" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
