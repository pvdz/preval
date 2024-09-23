# Preval test case

# unspported_expr.md

> Return param > Unspported expr
>
> If a function returns a static mutation to a param value we can outline the param and drop it

Returns an implicit global. Can't deal with it.

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = x + $(1); // This will break the "static expression" clause and prevent the trick
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
  const y = x + $(1);
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
  const tmpBinBothLhs = x;
  const tmpBinBothRhs = $(1);
  const y = tmpBinBothLhs + tmpBinBothRhs;
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
const tmpCalleeParam$3 = f(`three`);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const f /*:(unknown)=>*/ = function ($$0) {
  const x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const tmpBinBothRhs = $(1);
  const y = x + tmpBinBothRhs;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $(`a`);
    return y;
  } else {
    $(`b`);
    return y;
  }
};
const tmpCalleeParam = f(1);
$(tmpCalleeParam);
const tmpCalleeParam$1 = f(2);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = f(`three`);
$(tmpCalleeParam$3);
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
  const d = $( 1 );
  const e = b + d;
  const f = $( true );
  if (f) {
    $( "a" );
    return e;
  }
  else {
    $( "b" );
    return e;
  }
};
const g = a( 1 );
$( g );
const h = a( 2 );
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
 - 4: 1
 - 5: true
 - 6: 'a'
 - 7: 2
 - 8: 'no'
 - 9: 'inlining'
 - 10: 'please'
 - 11: 1
 - 12: true
 - 13: 'a'
 - 14: 3
 - 15: 'no'
 - 16: 'inlining'
 - 17: 'please'
 - 18: 1
 - 19: true
 - 20: 'a'
 - 21: 'three1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
