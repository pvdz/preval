# Preval test case

# base_let_multi_scope_read.md

> If merging > Base let multi scope read
>
> When back to back ifs test on the same constant, the ifs can be merged safely

## Input

`````js filename=intro
function f() {
  $('block inlinine');
  $('block inlinine');
  $('block inlinine');
  // x is multi-scope but only for reads
  return $(x);
}
let x 
if ($(true)) {
  x = !$(true);
} else {
  x = !$(false);
}
if (x) $('a'); else $('b');
if (x) $('d'); else $('c');
f();
f();
f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(`block inlinine`);
  $(`block inlinine`);
  $(`block inlinine`);
  return $(x);
};
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
f();
f();
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(`block inlinine`);
  $(`block inlinine`);
  $(`block inlinine`);
  const tmpReturnArg = $(x);
  return tmpReturnArg;
};
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
f();
f();
f();
`````

## Output


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  $(`block inlinine`);
  $(`block inlinine`);
  $(`block inlinine`);
  $(x);
  return undefined;
};
let x /*:primitive*/ = undefined;
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpUnaryArg /*:unknown*/ = $(true);
  x = !tmpUnaryArg;
} else {
  const tmpUnaryArg$1 /*:unknown*/ = $(false);
  x = !tmpUnaryArg$1;
}
if (x) {
  $(`a`);
  $(`d`);
} else {
  $(`b`);
  $(`c`);
}
f();
f();
f();
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "block inlinine" );
  $( "block inlinine" );
  $( "block inlinine" );
  $( b );
  return undefined;
};
let b = undefined;
const c = $( true );
if (c) {
  const d = $( true );
  b = !d;
}
else {
  const e = $( false );
  b = !e;
}
if (b) {
  $( "a" );
  $( "d" );
}
else {
  $( "b" );
  $( "c" );
}
a();
a();
a();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: true
 - 3: 'b'
 - 4: 'c'
 - 5: 'block inlinine'
 - 6: 'block inlinine'
 - 7: 'block inlinine'
 - 8: false
 - 9: 'block inlinine'
 - 10: 'block inlinine'
 - 11: 'block inlinine'
 - 12: false
 - 13: 'block inlinine'
 - 14: 'block inlinine'
 - 15: 'block inlinine'
 - 16: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
