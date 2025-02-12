# Preval test case

# call_with_args_spread.md

> Return param > Call with args spread
>
> If a function returns a static mutation to a param value we can outline the param and drop it

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = x(1, 'two', null, NaN);
  return y;
}

$(f(function(...args){ $('pass1', args); }));
$(f(function(...args){ $('pass2', args); }));
$(f(function(...args){ $('pass3', args); }));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = x(1, `two`, null, NaN);
  return y;
};
$(
  f(function (...$$0) {
    let args = $$0;
    debugger;
    $(`pass1`, args);
  }),
);
$(
  f(function (...$$0) {
    let args$1 = $$0;
    debugger;
    $(`pass2`, args$1);
  }),
);
$(
  f(function (...$$0) {
    let args$3 = $$0;
    debugger;
    $(`pass3`, args$3);
  }),
);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = x(1, `two`, null, NaN);
  return y;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = function (...$$0) {
  let args = $$0;
  debugger;
  $(`pass1`, args);
  return undefined;
};
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$3 = $;
const tmpCallCallee$5 = f;
const tmpCalleeParam$5 = function (...$$0) {
  let args$1 = $$0;
  debugger;
  $(`pass2`, args$1);
  return undefined;
};
const tmpCalleeParam$3 = tmpCallCallee$5(tmpCalleeParam$5);
tmpCallCallee$3(tmpCalleeParam$3);
const tmpCallCallee$7 = $;
const tmpCallCallee$9 = f;
const tmpCalleeParam$9 = function (...$$0) {
  let args$3 = $$0;
  debugger;
  $(`pass3`, args$3);
  return undefined;
};
const tmpCalleeParam$7 = tmpCallCallee$9(tmpCalleeParam$9);
tmpCallCallee$7(tmpCalleeParam$7);
`````

## Output


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  return undefined;
};
const tmpCalleeParam$1 /*:(unknown)=>undefined*/ = function (...$$0) {
  const args = $$0;
  debugger;
  $(`pass1`, args);
  return undefined;
};
f();
tmpCalleeParam$1(1, `two`, null, NaN);
$(undefined);
const tmpCalleeParam$5 /*:(unknown)=>undefined*/ = function (...$$0) {
  const args$1 = $$0;
  debugger;
  $(`pass2`, args$1);
  return undefined;
};
f();
tmpCalleeParam$5(1, `two`, null, NaN);
$(undefined);
const tmpCalleeParam$9 /*:(unknown)=>undefined*/ = function (...$$0) {
  const args$3 = $$0;
  debugger;
  $(`pass3`, args$3);
  return undefined;
};
f();
tmpCalleeParam$9(1, `two`, null, NaN);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "no" );
  $( "inlining" );
  $( "please" );
  return undefined;
};
const b = function($$0 ) {
  const c = $$0;
  debugger;
  $( "pass1", c );
  return undefined;
};
a();
b( 1, "two", null, NaN );
$( undefined );
const d = function($$0 ) {
  const e = $$0;
  debugger;
  $( "pass2", e );
  return undefined;
};
a();
d( 1, "two", null, NaN );
$( undefined );
const f = function($$0 ) {
  const g = $$0;
  debugger;
  $( "pass3", g );
  return undefined;
};
a();
f( 1, "two", null, NaN );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'no'
 - 2: 'inlining'
 - 3: 'please'
 - 4: 'pass1', [1, 'two', null, NaN]
 - 5: undefined
 - 6: 'no'
 - 7: 'inlining'
 - 8: 'please'
 - 9: 'pass2', [1, 'two', null, NaN]
 - 10: undefined
 - 11: 'no'
 - 12: 'inlining'
 - 13: 'please'
 - 14: 'pass3', [1, 'two', null, NaN]
 - 15: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
