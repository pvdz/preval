# Preval test case

# nested_if_on_same_test_alternate.md

> Normalize > If > Nested if on same test alternate
>
> A nested if testing the same binding can be collapsed

#TODO

## Input

`````js filename=intro
if ($) {
} else {
  if ($) { // This if should be eliminated
    $('eliminate me');
  } else {
    $('keep me');
  }
}
`````

## Pre Normal

`````js filename=intro
if ($) {
} else {
  if ($) {
    $(`eliminate me`);
  } else {
    $(`keep me`);
  }
}
`````

## Normalized

`````js filename=intro
if ($) {
} else {
  $(`keep me`);
}
`````

## Output

`````js filename=intro
if ($) {
} else {
  $(`keep me`);
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
