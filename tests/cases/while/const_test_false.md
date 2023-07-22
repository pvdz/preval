# Preval test case

# const_test_false.md

> While > Const test false
>
> A test that is a constant only needs to be tested once

#TODO

## Input

`````js filename=intro
const x = $(false);
while (x) {
  $('body');
}
$('after');
`````

## Pre Normal

`````js filename=intro
const x = $(false);
while (x) {
  $(`body`);
}
$(`after`);
`````

## Normalized

`````js filename=intro
const x = $(false);
while (true) {
  if (x) {
    $(`body`);
  } else {
    break;
  }
}
$(`after`);
`````

## Output

`````js filename=intro
const x = $(false);
let $tmpLoopUnrollCheck = true;
if (x) {
  $(`body`);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (x) {
      $(`body`);
    } else {
      break;
    }
  }
} else {
}
$(`after`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( false );
let b = true;
if (a) {
  $( "body" );
}
else {
  b = false;
}
if (b) {
  while ($LOOP_UNROLL_10) {
    if (a) {
      $( "body" );
    }
    else {
      break;
    }
  }
}
$( "after" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
