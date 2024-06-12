# Preval test case

# if_bool_then.md

> Tofix > If bool then
>
> Not sure why this doesn't work. Should become $(t); Source: cases/ret_bool_after_if/compare_return.md

#TODO

## Input

`````js filename=intro
const x = $(100);
const t = x <= 100;
if (t) {
  $(true);
} else {
  $(false);
}
`````

## Pre Normal


`````js filename=intro
const x = $(100);
const t = x <= 100;
if (t) {
  $(true);
} else {
  $(false);
}
`````

## Normalized


`````js filename=intro
const x = $(100);
const t = x <= 100;
if (t) {
  $(true);
} else {
  $(false);
}
`````

## Output


`````js filename=intro
const x = $(100);
const t = x <= 100;
if (t) {
  $(true);
} else {
  $(false);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = a <= 100;
if (b) {
  $( true );
}
else {
  $( false );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
