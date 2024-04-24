# Preval test case

# unary_if_neighbor_false.md

> If flipping > Unary if neighbor false
>
> When the binding is used in multiple `if`s

#TODO

## Input

`````js filename=intro
const a = $(false);
const b = $('alt');
let test = !a;
if (test) {
  test = b;
} else {
}
$(test);
`````

## Pre Normal

`````js filename=intro
const a = $(false);
const b = $(`alt`);
let test = !a;
if (test) {
  test = b;
} else {
}
$(test);
`````

## Normalized

`````js filename=intro
const a = $(false);
const b = $(`alt`);
let test = !a;
if (test) {
  test = b;
} else {
}
$(test);
`````

## Output

`````js filename=intro
const a = $(false);
const b = $(`alt`);
let test = !a;
if (a) {
  $(test);
} else {
  test = b;
  $(b);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( false );
const b = $( "alt" );
let c = !a;
if (a) {
  $( c );
}
else {
  c = b;
  $( b );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: 'alt'
 - 3: 'alt'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
