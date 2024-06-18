# Preval test case

# if_else3.md

> Normalize > Dce > Break > If else3
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
while ($(true)) {
  if ($(1)) {
    break;
    $('fail');
  }
  break;
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
  break;
}
$(`after`);
`````

## Normalized


`````js filename=intro
let tmpIfTest = $(true);
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
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(1);
} else {
}
$(`after`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 1 );
}
$( "after" );
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
