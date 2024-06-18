# Preval test case

# falsy.md

> Fake do while > Falsy
>
>

## Input

`````js filename=intro
let test = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (test) {
    $('breaking');
    break;
  } else {
    $('loop');
    test = test + 1;
  } 
}
$('end');
`````

## Pre Normal


`````js filename=intro
let test = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (test) {
    $(`breaking`);
    break;
  } else {
    $(`loop`);
    test = test + 1;
  }
}
$(`end`);
`````

## Normalized


`````js filename=intro
let test = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (test) {
    $(`breaking`);
    break;
  } else {
    $(`loop`);
    test = test + 1;
  }
}
$(`end`);
`````

## Output


`````js filename=intro
let test = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(`loop`);
  test = test + 1;
  if (test) {
    $(`breaking`);
    break;
  } else {
  }
}
$(`end`);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( "loop" );
  a = a + 1;
  if (a) {
    $( "breaking" );
    break;
  }
}
$( "end" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'loop'
 - 2: 'breaking'
 - 3: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
