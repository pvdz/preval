# Preval test case

# if-both-break.md

> Try escaping > If-both-break
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

(This case is easily foldable with identical branches but it wasn't at the time of writing and it covered a case heh)

## Input

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x = $(1);
  try {
    if (x) break;
    else break;
    $(arr[0]);
    arr.reverse();
  } catch {
    $('fail');
  }
}
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x = $(1);
  try {
    if (x) break;
    else break;
    $(arr[0]);
    arr.reverse();
  } catch (e) {
    $(`fail`);
  }
}
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x = $(1);
  try {
    if (x) {
      break;
    } else {
      break;
    }
  } catch (e) {
    $(`fail`);
  }
}
`````

## Output


`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
