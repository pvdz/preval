# Preval test case

# base_binary_noteqeq.md

> If flipping > Base binary noteqeq
>
> When we can trivially detect an if to be using a flipped ident, use the ident instead

#TODO

## Input

`````js filename=intro
const x = $(1);
const y = x !== 1;
if (y) { // This should become x, with the branches flipped
  $('if');
} else {
  $('else');
}
`````

## Pre Normal

`````js filename=intro
const x = $(1);
const y = x !== 1;
if (y) {
  $(`if`);
} else {
  $(`else`);
}
`````

## Normalized

`````js filename=intro
const x = $(1);
const y = x !== 1;
if (y) {
  $(`if`);
} else {
  $(`else`);
}
`````

## Output

`````js filename=intro
const x = $(1);
const y = x === 1;
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
const b = a === 1;
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
 - 2: 'else'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
