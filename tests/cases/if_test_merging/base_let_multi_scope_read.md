# Preval test case

# base_let_multi_scope_read.md

> If test merging > Base let multi scope read
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


## Settled


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
const tmpBool /*:boolean*/ = $boolean_constructor(tmpIfTest);
const tmpUnaryArg /*:unknown*/ = $(tmpBool);
x = !tmpUnaryArg;
if (tmpUnaryArg) {
  $(`b`);
  $(`c`);
  f();
  f();
  f();
} else {
  $(`a`);
  $(`d`);
  f();
  f();
  f();
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $(`block inlinine`);
  $(`block inlinine`);
  $(`block inlinine`);
  $(x);
};
let x = undefined;
const tmpUnaryArg = $($boolean_constructor($(true)));
x = !tmpUnaryArg;
if (tmpUnaryArg) {
  $(`b`);
  $(`c`);
  f();
  f();
  f();
} else {
  $(`a`);
  $(`d`);
  f();
  f();
  f();
}
`````


## PST Settled
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
const d = $boolean_constructor( c );
const e = $( d );
b = !e;
if (e) {
  $( "b" );
  $( "c" );
  a();
  a();
  a();
}
else {
  $( "a" );
  $( "d" );
  a();
  a();
  a();
}
`````


## Normalized
(This is what phase1 received the first time)

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
  f();
  f();
  f();
} else {
  $(`c`);
  f();
  f();
  f();
}
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check
- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


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

Post settled calls: Same

Denormalized calls: Same
