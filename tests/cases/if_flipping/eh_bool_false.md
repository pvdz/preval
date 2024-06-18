# Preval test case

# eh_bool_false.md

> If flipping > Eh bool false
>
> An if-test that is the result of a bool conversion should use the arg directly

## Input

`````js filename=intro
const y = $(0);
const x = Boolean(y);
if (x) $('then');
else $('else');
`````

## Pre Normal


`````js filename=intro
const y = $(0);
const x = Boolean(y);
if (x) $(`then`);
else $(`else`);
`````

## Normalized


`````js filename=intro
const y = $(0);
const x = Boolean(y);
if (x) {
  $(`then`);
} else {
  $(`else`);
}
`````

## Output


`````js filename=intro
const y = $(0);
if (y) {
  $(`then`);
} else {
  $(`else`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  $( "then" );
}
else {
  $( "else" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 'else'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
