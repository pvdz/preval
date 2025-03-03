# Preval test case

# loop.md

> If test nested > Loop
>
> When a const is tested twice, the second test is gonna have the same outcome as the first

## Input

`````js filename=intro
const x = $();
if (x) {
  while (true) {
    if (x) {
      $('round and');
    } else {
      break;
    }
  }
}
`````

## Pre Normal


`````js filename=intro
const x = $();
if (x) {
  while (true) {
    if (x) {
      $(`round and`);
    } else {
      break;
    }
  }
}
`````

## Normalized


`````js filename=intro
const x = $();
if (x) {
  while (true) {
    if (x) {
      $(`round and`);
    } else {
      break;
    }
  }
} else {
}
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $();
if (x) {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(`round and`);
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
if (a) {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( "round and" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
