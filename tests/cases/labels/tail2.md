# Preval test case

# tail2.md

> Labels > Tail2
>
> Regression where break to label was eliminated because
> it was the tail position all the way back to its loop.
> But it forgot that loops would break that transform. Uups.

## Input

`````js filename=intro
$(`start`);
$continue: {
  while (true) {
    if ($) {
      $(`inner`);
      break $continue;
    }
  }
}
$('end');
`````

## Pre Normal


`````js filename=intro
$(`start`);
$continue: {
  while (true) {
    if ($) {
      $(`inner`);
      break $continue;
    }
  }
}
$(`end`);
`````

## Normalized


`````js filename=intro
$(`start`);
while (true) {
  if ($) {
    $(`inner`);
    break;
  } else {
  }
}
$(`end`);
`````

## Output


`````js filename=intro
$(`start`);
if ($) {
  $(`inner`);
} else {
  while ($LOOP_UNROLL_10) {
    if ($) {
      $(`inner`);
      break;
    } else {
    }
  }
}
$(`end`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "start" );
if ($) {
  $( "inner" );
}
else {
  while ($LOOP_UNROLL_10) {
    if ($) {
      $( "inner" );
      break;
    }
  }
}
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
