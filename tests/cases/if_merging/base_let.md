# Preval test case

# base_let.md

> If merging > Base let
>
> When back to back ifs test on the same constant, the ifs can be merged safely

## Input

`````js filename=intro
let x 
if ($(true)) {
  x = !$(true);
} else {
  x = !$(false);
}
if (x) $('a'); else $('b');
if (x) $('d'); else $('c');
`````

## Pre Normal


`````js filename=intro
let x;
if ($(true)) {
  x = !$(true);
} else {
  x = !$(false);
}
if (x) $(`a`);
else $(`b`);
if (x) $(`d`);
else $(`c`);
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpIfTest = $(true);
if (tmpIfTest) {
  const tmpUnaryArg = $(true);
  x = !tmpUnaryArg;
} else {
  const tmpUnaryArg$1 = $(false);
  x = !tmpUnaryArg$1;
}
if (x) {
  $(`a`);
} else {
  $(`b`);
}
if (x) {
  $(`d`);
} else {
  $(`c`);
}
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
const tmpBool /*:boolean*/ = Boolean(tmpIfTest);
const tmpUnaryArg /*:unknown*/ = $(tmpBool);
if (tmpUnaryArg) {
  $(`b`);
  $(`c`);
} else {
  $(`a`);
  $(`d`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
const b = Boolean( a );
const c = $( b );
if (c) {
  $( "b" );
  $( "c" );
}
else {
  $( "a" );
  $( "d" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: true
 - 3: 'b'
 - 4: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
