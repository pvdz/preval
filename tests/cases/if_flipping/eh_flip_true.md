# Preval test case

# eh_flip_true.md

> If flipping > Eh flip true
>
> An if-test that is the result of a bool conversion should use the arg directly

## Input

`````js filename=intro
const y = $(1);
const x = !y;
if (x) $('then');
else $('else');
`````

## Pre Normal


`````js filename=intro
const y = $(1);
const x = !y;
if (x) $(`then`);
else $(`else`);
`````

## Normalized


`````js filename=intro
const y = $(1);
const x = !y;
if (x) {
  $(`then`);
} else {
  $(`else`);
}
`````

## Output


`````js filename=intro
const y = $(1);
if (y) {
  $(`else`);
} else {
  $(`then`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( "else" );
}
else {
  $( "then" );
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
