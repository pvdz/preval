# Preval test case

# if_else_partial.md

> Normalize > Dce > Break > If else partial
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  if ($(1)) {
    break;
    $('fail');
  }
  $('keep, do not eval');
}
$('after');
`````

## Pre Normal

`````js filename=intro
while ($(true)) {
  if ($(1)) {
    break;
    $(`fail`);
  }
  $(`keep, do not eval`);
}
$(`after`);
`````

## Normalized

`````js filename=intro
let tmpIfTest = $(true);
while (tmpIfTest) {
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    break;
  } else {
    $(`keep, do not eval`);
    tmpIfTest = $(true);
  }
}
$(`after`);
`````

## Output

`````js filename=intro
let tmpIfTest = $(true);
while (tmpIfTest) {
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    break;
  } else {
    $(`keep, do not eval`);
    tmpIfTest = $(true);
  }
}
$(`after`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 1
 - 3: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
