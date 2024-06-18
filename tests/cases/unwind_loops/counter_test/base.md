# Preval test case

# base.md

> Unwind loops > Counter test > Base
>
> todo

## Input

`````js filename=intro
let counter = 5;
while (counter) {
  $('x' + counter)
  counter = counter - 1;
}
$('finished');
`````

## Pre Normal


`````js filename=intro
let counter = 5;
while (counter) {
  $(`x` + counter);
  counter = counter - 1;
}
$(`finished`);
`````

## Normalized


`````js filename=intro
let counter = 5;
while (true) {
  if (counter) {
    const tmpCallCallee = $;
    const tmpStringConcatL = $coerce(counter, `plustr`);
    const tmpCalleeParam = `x${tmpStringConcatL}`;
    tmpCallCallee(tmpCalleeParam);
    counter = counter - 1;
  } else {
    break;
  }
}
$(`finished`);
`````

## Output


`````js filename=intro
$(`x5`);
$(`x4`);
$(`x3`);
$(`x2`);
$(`x1`);
$(`finished`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "x5" );
$( "x4" );
$( "x3" );
$( "x2" );
$( "x1" );
$( "finished" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x5'
 - 2: 'x4'
 - 3: 'x3'
 - 4: 'x2'
 - 5: 'x1'
 - 6: 'finished'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
