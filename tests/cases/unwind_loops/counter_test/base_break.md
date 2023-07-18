# Preval test case

# base_break.md

> Unwind loops > Counter test > Base break
>
> todo

#TODO

## Input

`````js filename=intro
let counter = 5;
while (true) {
  counter = counter - 1;
  if (counter) {
    $('x')
  } else {
    break;
  }
}
$('finished');
`````

## Pre Normal

`````js filename=intro
let counter = 5;
while (true) {
  counter = counter - 1;
  if (counter) {
    $(`x`);
  } else {
    break;
  }
}
$(`finished`);
`````

## Normalized

`````js filename=intro
let counter = 5;
counter = counter - 1;
while (true) {
  if (counter) {
    $(`x`);
    counter = counter - 1;
  } else {
    break;
  }
}
$(`finished`);
`````

## Output

`````js filename=intro
$(`x`);
$(`x`);
$(`x`);
$(`x`);
$(`finished`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "x" );
$( "x" );
$( "x" );
$( "x" );
$( "finished" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - 2: 'x'
 - 3: 'x'
 - 4: 'x'
 - 5: 'finished'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
