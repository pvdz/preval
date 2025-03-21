# Preval test case

# init_undef_unused_mustbebool.md

> Type tracked > Init undef unused mustbebool
>

(existing test)

If the var is set to undefined but that's not observed then the typing can be
improved to what is actually assigned, if that's the case like in this test.

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
let x /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(true);
const tmpBool /*:boolean*/ = Boolean(tmpIfTest);
const tmpUnaryArg /*:unknown*/ = $(tmpBool);
const tmpBool$1 /*:boolean*/ = !tmpUnaryArg;
x = tmpBool$1;
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
const tmpUnaryArg = $(Boolean($(true)));
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
const d = Boolean( c );
const e = $( d );
const f = !e;
b = f;
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


## Todos triggered


None


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
