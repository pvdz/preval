# Preval test case

# if_else2.md

> Normalize > Dce > Break > If else2
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
  break;
  $('fail');
}
$('after');
`````

## Pre Normal

`````js filename=intro
while ($(true)) {
  if ($(1)) {
    break;
    $('fail');
  }
  break;
  $('fail');
}
$('after');
`````

## Normalized

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(1);
    if (tmpIfTest$1) {
      break;
    } else {
      break;
    }
  } else {
    break;
  }
}
$('after');
`````

## Output

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(1);
    if (tmpIfTest$1) {
      break;
    } else {
      break;
    }
  } else {
    break;
  }
}
$('after');
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
