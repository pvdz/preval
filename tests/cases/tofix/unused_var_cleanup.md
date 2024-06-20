# Preval test case

# unused_var_cleanup.md

> Tofix > Unused var cleanup
>
> Variable assignments that are never read should be dropped

## Input

`````js filename=intro
const x = $(false);
let $tmpLoopUnrollCheck = true;
if (x) {
  $(`body`);
  while ($LOOP_UNROLL_10) {
    if (x) {
      $(`body`);
    } else {
      break;
    }
  }
} else {
  $tmpLoopUnrollCheck = false;
}
$(`after`);
`````

## Pre Normal


`````js filename=intro
const x = $(false);
let $tmpLoopUnrollCheck = true;
if (x) {
  $(`body`);
  while ($LOOP_UNROLL_10) {
    if (x) {
      $(`body`);
    } else {
      break;
    }
  }
} else {
  $tmpLoopUnrollCheck = false;
}
$(`after`);
`````

## Normalized


`````js filename=intro
const x = $(false);
let $tmpLoopUnrollCheck = true;
if (x) {
  while ($LOOP_UNROLL_10) {
    $(`body`);
    if (x) {
    } else {
      break;
    }
  }
} else {
  $tmpLoopUnrollCheck = false;
}
$(`after`);
`````

## Output


`````js filename=intro
const x = $(false);
if (x) {
  while ($LOOP_UNROLL_10) {
    $(`body`);
    if (x) {
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
if (a) {
  while ($LOOP_UNROLL_10) {
    $( "body" );
    if (a) {

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
