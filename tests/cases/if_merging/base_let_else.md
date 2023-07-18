# Preval test case

# base_let_else.md

> If merging > Base let else
>
> When back to back ifs test on the same constant, the ifs can be merged safely

#TODO

## Input

`````js filename=intro
let x 
if ($(true)) {
  x = !$(true);
} else {
  x = !$(false);
}
if (x) {
  $('a');
} else {
  $('b');
  x = 10; // Blocks the merge
}
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
if (x) {
  $(`a`);
} else {
  $(`b`);
  x = 10;
}
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
  x = 10;
}
if (x) {
  $(`d`);
} else {
  $(`c`);
}
`````

## Output

`````js filename=intro
let x = true;
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
  x = true;
}
if (x) {
  $(`d`);
} else {
  $(`c`);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
const b = $( true );
if (b) {
  const c = $( true );
  a = !c;
}
else {
  const d = $( false );
  a = !d;
}
if (a) {
  $( "a" );
}
else {
  $( "b" );
  a = true;
}
if (a) {
  $( "d" );
}
else {
  $( "c" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: true
 - 3: 'b'
 - 4: 'd'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
