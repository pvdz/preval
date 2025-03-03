# Preval test case

# base_let_after.md

> If merging > Base let after
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

// The point of the rest is to show that a write to x does not need to block
// the merge while trying to ensure other tricks don't optimize it away...

if ($(true)) {
  x = !$(true);
} else {
  x = !$(false);
}
if ($(true)) {
  $('true', x);
} else {
  $('false', x);
}
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
if ($(true)) {
  x = !$(true);
} else {
  x = !$(false);
}
if ($(true)) {
  $(`true`, x);
} else {
  $(`false`, x);
}
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
const tmpIfTest$1 = $(true);
if (tmpIfTest$1) {
  const tmpUnaryArg$3 = $(true);
  x = !tmpUnaryArg$3;
} else {
  const tmpUnaryArg$5 = $(false);
  x = !tmpUnaryArg$5;
}
const tmpIfTest$3 = $(true);
if (tmpIfTest$3) {
  $(`true`, x);
} else {
  $(`false`, x);
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
const tmpIfTest$1 /*:unknown*/ = $(true);
const tmpBool$1 /*:boolean*/ = Boolean(tmpIfTest$1);
const tmpUnaryArg$3 /*:unknown*/ = $(tmpBool$1);
const tmpIfTest$3 /*:unknown*/ = $(true);
const tmpClusterSSA_x /*:boolean*/ = !tmpUnaryArg$3;
if (tmpIfTest$3) {
  $(`true`, tmpClusterSSA_x);
} else {
  $(`false`, tmpClusterSSA_x);
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
const d = $( true );
const e = Boolean( d );
const f = $( e );
const g = $( true );
const h = !f;
if (g) {
  $( "true", h );
}
else {
  $( "false", h );
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
 - 5: true
 - 6: true
 - 7: true
 - 8: 'true', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
