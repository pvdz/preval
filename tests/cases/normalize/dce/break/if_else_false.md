# Preval test case

# if_else_false.md

> Normalize > Dce > Break > If else false
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
while ($(false)) {
  if ($(1)) break;
  else break;
  $('fail');
}
$('after');
`````

## Pre Normal

`````js filename=intro
while ($(false)) {
  if ($(1)) break;
  else break;
  $(`fail`);
}
$(`after`);
`````

## Normalized

`````js filename=intro
let tmpIfTest = $(false);
while (true) {
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
$(`after`);
`````

## Output

`````js filename=intro
const tmpIfTest = $(false);
if (tmpIfTest) {
  $(1);
} else {
}
$(`after`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( false );
if (a) {
  $( 1 );
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
