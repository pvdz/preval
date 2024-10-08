# Preval test case

# non-call.md

> Return param > Non-call
>
> If a function returns a static mutation to a param value we can outline the param and drop it

Returns an implicit global. Can't deal with it.

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = ~x;
  if ($(true)) {
    $('a');
    return y;
  } else {
    $('b');
    return y;
  }
}

$(f(1));
$(f(2));
$(f.length); // This prevents the trick
$(f('three'));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = ~x;
  if ($(true)) {
    $(`a`);
    return y;
  } else {
    $(`b`);
    return y;
  }
};
$(f(1));
$(f(2));
$(f.length);
$(f(`three`));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = ~x;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $(`a`);
    return y;
  } else {
    $(`b`);
    return y;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(1);
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(2);
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f.length;
tmpCallCallee$3(tmpCalleeParam$3);
const tmpCallCallee$5 = $;
const tmpCalleeParam$5 = f(`three`);
tmpCallCallee$5(tmpCalleeParam$5);
`````

## Output


`````js filename=intro
const f /*:(unknown)=>number*/ = function ($$0) {
  const x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y /*:number*/ = ~x;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $(`a`);
    return y;
  } else {
    $(`b`);
    return y;
  }
};
const tmpCalleeParam /*:number*/ = f(1);
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:number*/ = f(2);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = f.length;
$(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:number*/ = f(`three`);
$(tmpCalleeParam$5);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  $( "no" );
  $( "inlining" );
  $( "please" );
  const d = ~b;
  const e = $( true );
  if (e) {
    $( "a" );
    return d;
  }
  else {
    $( "b" );
    return d;
  }
};
const f = a( 1 );
$( f );
const g = a( 2 );
$( g );
const h = a.length;
$( h );
const i = a( "three" );
$( i );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'no'
 - 2: 'inlining'
 - 3: 'please'
 - 4: true
 - 5: 'a'
 - 6: -2
 - 7: 'no'
 - 8: 'inlining'
 - 9: 'please'
 - 10: true
 - 11: 'a'
 - 12: -3
 - 13: 1
 - 14: 'no'
 - 15: 'inlining'
 - 16: 'please'
 - 17: true
 - 18: 'a'
 - 19: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
