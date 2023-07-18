# Preval test case

# nested_if_on_same_test_consequent.md

> Normalize > If > Nested if on same test consequent
>
> A nested if testing the same binding can be collapsed

#TODO

## Input

`````js filename=intro
if ($) {
  if ($) { // This if should be eliminated
    $('keep me');
  } else {
    $('eliminate me');
  }
}
`````

## Pre Normal

`````js filename=intro
if ($) {
  if ($) {
    $(`keep me`);
  } else {
    $(`eliminate me`);
  }
}
`````

## Normalized

`````js filename=intro
if ($) {
  $(`keep me`);
} else {
}
`````

## Output

`````js filename=intro
if ($) {
  $(`keep me`);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  $( "keep me" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'keep me'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
