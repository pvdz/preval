# Preval test case

# base_string_empty.md

> Type tracked > If > Base string empty
>
> Even if we don't know about the concrete value of a binding, sometimes the type is sufficient for optimization

## Input

`````js filename=intro
const x = '' + $('');
if (x) {
  $(x, 'false');
} else {
  $(x, 'pass');
}
`````

## Pre Normal


`````js filename=intro
const x = `` + $(``);
if (x) {
  $(x, `false`);
} else {
  $(x, `pass`);
}
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $(``);
const x = tmpBinBothLhs + tmpBinBothRhs;
if (x) {
  $(x, `false`);
} else {
  $(x, `pass`);
}
`````

## Output


`````js filename=intro
const tmpBinBothRhs = $(``);
const x /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
if (x) {
  $(x, `false`);
} else {
  $(``, `pass`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "" );
const b = $coerce( a, "plustr" );
if (b) {
  $( b, "false" );
}
else {
  $( "", "pass" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ''
 - 2: '', 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
