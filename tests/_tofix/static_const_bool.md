# Preval test case

# static_const_bool.md

> Tofix > static const bool
>
> A const that is only tested (treated as bool) and which we can
> proof not to change must have the same outcome when tested before

## Input

`````js filename=intro
const x = $(false);
if (x) {
  $(`body`);
  while ($LOOP_UNROLL_10) {
    if (x) { // We can safely determine this to be truthy
      $(`body`);
    } else {
      break;
    }
  }
} else {
}
$(`after`);
`````

## Pre Normal


`````js filename=intro
const x = $(false);
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
}
$(`after`);
`````

## Normalized


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

## Output


`````js filename=intro
const x /*:unknown*/ = $(false);
if (x) {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(`body`);
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
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( "body" );
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
