# Preval test case

# bin_left_str.md

> If update var > Bin left str
>
> If a variable is conditionally set and then used in a binding after the `if`/`else`, we may be able to hoist the binding inside those branches.

The idea is that `x` will be replaced by `y` here.

#TODO

## Input

`````js filename=intro
let x = undefined;
if ($(true)) {
  x = 100;
} else {
  x = 200;
}
const y = x + 'right';
$(y);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
if ($(true)) {
  x = 100;
} else {
  x = 200;
}
const y = x + `right`;
$(y);
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpIfTest = $(true);
if (tmpIfTest) {
  x = 100;
} else {
  x = 200;
}
const tmpStringConcatR = $coerce(x, `plustr`);
const y = `${tmpStringConcatR}right`;
$(y);
`````

## Output


`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(`100right`);
} else {
  $(`200right`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "100right" );
}
else {
  $( "200right" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: '100right'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
