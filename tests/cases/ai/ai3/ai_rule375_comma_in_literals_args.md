# Preval test case

# ai_rule375_comma_in_literals_args.md

> Ai > Ai3 > Ai rule375 comma in literals args
>
> Rule 375: Comma operator in literals and arguments

## Input

`````js filename=intro
(function() {
  let x = 0, y = 0, z = 0;

  // Test 1: Comma in array literal
  const arr = [
    ($('arr_fx1', (x=1)), $('arr_val1', x*10)),
    (x=2, $('arr_fx2', (y=x*2)), $('arr_val2', y*10))
  ];
  $('arr_final', JSON.stringify(arr));
  $('x_after_arr', x);
  $('y_after_arr', y);

  // Test 2: Comma in object literal
  x=0; y=0;
  const obj = {
    prop1: ($('obj_fx1', (x=5)), $('obj_val1', x+1)),
    prop2: (x=6, $('obj_fx2', (y=x+2)), $('obj_val2', y+3))
  };
  $('obj_final_p1', obj.prop1);
  $('obj_final_p2', obj.prop2);
  $('x_after_obj', x);
  $('y_after_obj', y);

  // Test 3: Comma in function call arguments
  x=0; y=0;
  function foo(a, b) {
    $('foo_called', a, b);
    return a + b;
  }
  let res_foo = foo(
    ($('call_fx1', (x=100)), $('call_val1', x+10)),
    (x=200, $('call_fx2', (y=x+20)), $('call_val2', y+30))
  );
  $('res_foo', res_foo);
  $('x_after_call', x);
  $('y_after_call', y);
  
  // Test 4: Comma in opaque function call arguments
  x=0; y=0;
  let opaque_func = $('get_func', foo);
  let res_opaque_foo = opaque_func(
    ($('opq_call_fx1', (x=300)), $('opq_call_val1', x+1)),
    (x=400, $('opq_call_fx2', (y=x+2)), $('opq_call_val2', y+3))
  );
  $('res_opaque_foo', res_opaque_foo);
  $('x_after_opq_call', x);
  $('y_after_opq_call', y);
})();
`````


## Settled


`````js filename=intro
const foo /*:(unknown, unknown)=>primitive*/ = function ($$0, $$1) {
  const a /*:unknown*/ = $$0;
  const b /*:unknown*/ = $$1;
  debugger;
  $(`foo_called`, a, b);
  const tmpReturnArg /*:primitive*/ = a + b;
  return tmpReturnArg;
};
$(`arr_fx1`, 1);
const tmpArrElement /*:unknown*/ = $(`arr_val1`, 10);
$(`arr_fx2`, 4);
const tmpArrElement$1 /*:unknown*/ = $(`arr_val2`, 40);
const arr /*:array*/ = [tmpArrElement, tmpArrElement$1];
const tmpCalleeParam$7 /*:primitive*/ = $JSON_stringify(arr);
$(`arr_final`, tmpCalleeParam$7);
$(`x_after_arr`, 2);
$(`y_after_arr`, 4);
$(`obj_fx1`, 5);
const tmpObjLitVal /*:unknown*/ = $(`obj_val1`, 6);
$(`obj_fx2`, 8);
const tmpObjLitVal$1 /*:unknown*/ = $(`obj_val2`, 11);
$(`obj_final_p1`, tmpObjLitVal);
$(`obj_final_p2`, tmpObjLitVal$1);
$(`x_after_obj`, 6);
$(`y_after_obj`, 8);
$(`call_fx1`, 100);
const tmpCalleeParam$21 /*:unknown*/ = $(`call_val1`, 110);
$(`call_fx2`, 220);
const tmpCalleeParam$23 /*:unknown*/ = $(`call_val2`, 250);
const res_foo /*:primitive*/ = foo(tmpCalleeParam$21, tmpCalleeParam$23);
$(`res_foo`, res_foo);
$(`x_after_call`, 200);
$(`y_after_call`, 220);
const opaque_func /*:unknown*/ = $(`get_func`, foo);
$(`opq_call_fx1`, 300);
const tmpCalleeParam$33 /*:unknown*/ = $(`opq_call_val1`, 301);
$(`opq_call_fx2`, 402);
const tmpCalleeParam$35 /*:unknown*/ = $(`opq_call_val2`, 405);
const res_opaque_foo /*:unknown*/ = opaque_func(tmpCalleeParam$33, tmpCalleeParam$35);
$(`res_opaque_foo`, res_opaque_foo);
$(`x_after_opq_call`, 400);
$(`y_after_opq_call`, 402);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const foo = function (a, b) {
  $(`foo_called`, a, b);
  const tmpReturnArg = a + b;
  return tmpReturnArg;
};
$(`arr_fx1`, 1);
const tmpArrElement = $(`arr_val1`, 10);
$(`arr_fx2`, 4);
const tmpArrElement$1 = $(`arr_val2`, 40);
$(`arr_final`, $JSON_stringify([tmpArrElement, tmpArrElement$1]));
$(`x_after_arr`, 2);
$(`y_after_arr`, 4);
$(`obj_fx1`, 5);
const tmpObjLitVal = $(`obj_val1`, 6);
$(`obj_fx2`, 8);
const tmpObjLitVal$1 = $(`obj_val2`, 11);
$(`obj_final_p1`, tmpObjLitVal);
$(`obj_final_p2`, tmpObjLitVal$1);
$(`x_after_obj`, 6);
$(`y_after_obj`, 8);
$(`call_fx1`, 100);
const tmpCalleeParam$21 = $(`call_val1`, 110);
$(`call_fx2`, 220);
$(`res_foo`, foo(tmpCalleeParam$21, $(`call_val2`, 250)));
$(`x_after_call`, 200);
$(`y_after_call`, 220);
const opaque_func = $(`get_func`, foo);
$(`opq_call_fx1`, 300);
const tmpCalleeParam$33 = $(`opq_call_val1`, 301);
$(`opq_call_fx2`, 402);
$(`res_opaque_foo`, opaque_func(tmpCalleeParam$33, $(`opq_call_val2`, 405)));
$(`x_after_opq_call`, 400);
$(`y_after_opq_call`, 402);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  const b = $$0;
  const c = $$1;
  debugger;
  $( "foo_called", b, c );
  const d = b + c;
  return d;
};
$( "arr_fx1", 1 );
const e = $( "arr_val1", 10 );
$( "arr_fx2", 4 );
const f = $( "arr_val2", 40 );
const g = [ e, f ];
const h = $JSON_stringify( g );
$( "arr_final", h );
$( "x_after_arr", 2 );
$( "y_after_arr", 4 );
$( "obj_fx1", 5 );
const i = $( "obj_val1", 6 );
$( "obj_fx2", 8 );
const j = $( "obj_val2", 11 );
$( "obj_final_p1", i );
$( "obj_final_p2", j );
$( "x_after_obj", 6 );
$( "y_after_obj", 8 );
$( "call_fx1", 100 );
const k = $( "call_val1", 110 );
$( "call_fx2", 220 );
const l = $( "call_val2", 250 );
const m = a( k, l );
$( "res_foo", m );
$( "x_after_call", 200 );
$( "y_after_call", 220 );
const n = $( "get_func", a );
$( "opq_call_fx1", 300 );
const o = $( "opq_call_val1", 301 );
$( "opq_call_fx2", 402 );
const p = $( "opq_call_val2", 405 );
const q = n( o, p );
$( "res_opaque_foo", q );
$( "x_after_opq_call", 400 );
$( "y_after_opq_call", 402 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  let foo = function ($$0, $$1) {
    let a = $$0;
    let b = $$1;
    debugger;
    $(`foo_called`, a, b);
    const tmpReturnArg = a + b;
    return tmpReturnArg;
  };
  let x = 0;
  let y = 0;
  let z = 0;
  x = 1;
  let tmpCalleeParam = x;
  $(`arr_fx1`, x);
  let tmpCalleeParam$1 = x * 10;
  const tmpArrElement = $(`arr_val1`, tmpCalleeParam$1);
  x = 2;
  y = x * 2;
  let tmpCalleeParam$3 = y;
  $(`arr_fx2`, y);
  let tmpCalleeParam$5 = y * 10;
  const tmpArrElement$1 = $(`arr_val2`, tmpCalleeParam$5);
  const arr = [tmpArrElement, tmpArrElement$1];
  const tmpMCF = $JSON_stringify;
  let tmpCalleeParam$7 = $JSON_stringify(arr);
  $(`arr_final`, tmpCalleeParam$7);
  $(`x_after_arr`, x);
  $(`y_after_arr`, y);
  x = 0;
  y = 0;
  x = 5;
  let tmpCalleeParam$9 = x;
  $(`obj_fx1`, x);
  let tmpCalleeParam$11 = x + 1;
  const tmpObjLitVal = $(`obj_val1`, tmpCalleeParam$11);
  x = 6;
  y = x + 2;
  let tmpCalleeParam$13 = y;
  $(`obj_fx2`, y);
  let tmpCalleeParam$15 = y + 3;
  const tmpObjLitVal$1 = $(`obj_val2`, tmpCalleeParam$15);
  const obj = { prop1: tmpObjLitVal, prop2: tmpObjLitVal$1 };
  let tmpCalleeParam$17 = obj.prop1;
  $(`obj_final_p1`, tmpCalleeParam$17);
  let tmpCalleeParam$19 = obj.prop2;
  $(`obj_final_p2`, tmpCalleeParam$19);
  $(`x_after_obj`, x);
  $(`y_after_obj`, y);
  x = 0;
  y = 0;
  const tmpCallCallee = foo;
  x = 100;
  let tmpCalleeParam$25 = x;
  $(`call_fx1`, x);
  let tmpCalleeParam$27 = x + 10;
  let tmpCalleeParam$21 = $(`call_val1`, tmpCalleeParam$27);
  x = 200;
  y = x + 20;
  let tmpCalleeParam$29 = y;
  $(`call_fx2`, y);
  let tmpCalleeParam$31 = y + 30;
  let tmpCalleeParam$23 = $(`call_val2`, tmpCalleeParam$31);
  let res_foo = foo(tmpCalleeParam$21, tmpCalleeParam$23);
  $(`res_foo`, res_foo);
  $(`x_after_call`, x);
  $(`y_after_call`, y);
  x = 0;
  y = 0;
  let opaque_func = $(`get_func`, foo);
  const tmpCallCallee$1 = opaque_func;
  x = 300;
  let tmpCalleeParam$37 = x;
  $(`opq_call_fx1`, x);
  let tmpCalleeParam$39 = x + 1;
  let tmpCalleeParam$33 = $(`opq_call_val1`, tmpCalleeParam$39);
  x = 400;
  y = x + 2;
  let tmpCalleeParam$41 = y;
  $(`opq_call_fx2`, y);
  let tmpCalleeParam$43 = y + 3;
  let tmpCalleeParam$35 = $(`opq_call_val2`, tmpCalleeParam$43);
  let res_opaque_foo = opaque_func(tmpCalleeParam$33, tmpCalleeParam$35);
  $(`res_opaque_foo`, res_opaque_foo);
  $(`x_after_opq_call`, x);
  $(`y_after_opq_call`, y);
  return undefined;
};
tmpCallComplexCallee();
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $JSON_stringify


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'arr_fx1', 1
 - 2: 'arr_val1', 10
 - 3: 'arr_fx2', 4
 - 4: 'arr_val2', 40
 - 5: 'arr_final', '["arr_val1","arr_val2"]'
 - 6: 'x_after_arr', 2
 - 7: 'y_after_arr', 4
 - 8: 'obj_fx1', 5
 - 9: 'obj_val1', 6
 - 10: 'obj_fx2', 8
 - 11: 'obj_val2', 11
 - 12: 'obj_final_p1', 'obj_val1'
 - 13: 'obj_final_p2', 'obj_val2'
 - 14: 'x_after_obj', 6
 - 15: 'y_after_obj', 8
 - 16: 'call_fx1', 100
 - 17: 'call_val1', 110
 - 18: 'call_fx2', 220
 - 19: 'call_val2', 250
 - 20: 'foo_called', 'call_val1', 'call_val2'
 - 21: 'res_foo', 'call_val1call_val2'
 - 22: 'x_after_call', 200
 - 23: 'y_after_call', 220
 - 24: 'get_func', '<function>'
 - 25: 'opq_call_fx1', 300
 - 26: 'opq_call_val1', 301
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
