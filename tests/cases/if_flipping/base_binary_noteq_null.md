# Preval test case

# base_binary_noteq_null.md

> If flipping > Base binary noteq null
>
> When we can trivially detect an if to be using a flipped ident, use the ident instead

#TODO

## Input

`````js filename=intro
const x = $(1);
const y = x != null; // Does not coerce, so this should not be observable
if (y) { // This should become x, with the branches flipped
  $('if');
} else {
  $('else');
}
`````

## Pre Normal


`````js filename=intro
const x = $(1);
const y = x != null;
if (y) {
  $(`if`);
} else {
  $(`else`);
}
`````

## Normalized


`````js filename=intro
const x = $(1);
const y = x != null;
if (y) {
  $(`if`);
} else {
  $(`else`);
}
`````

## Output


`````js filename=intro
const x = $(1);
const y = x == null;
if (y) {
  $(`else`);
} else {
  $(`if`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = a == null;
if (b) {
  $( "else" );
}
else {
  $( "if" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'if'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
