# Preval test case

# tail.md

> Labels > Tail
>
> Regression where break to label was eliminated because
> it was the tail position all the way back to its loop.
> But it forgot that loops would break that transform. Uups.

## Input

`````js filename=intro
$(`start`);
$continue: {
  while (true) {
    $(`inner`);
    break $continue;
  }
}
$('end');
`````

## Pre Normal


`````js filename=intro
$(`start`);
$continue: {
  while (true) {
    $(`inner`);
    break $continue;
  }
}
$(`end`);
`````

## Normalized


`````js filename=intro
$(`start`);
$(`inner`);
$(`end`);
`````

## Output


`````js filename=intro
$(`start`);
$(`inner`);
$(`end`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "start" );
$( "inner" );
$( "end" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'start'
 - 2: 'inner'
 - 3: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
