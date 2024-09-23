# Preval test case

# spread_param_unary.md

> Return param > Spread param unary
>
> If a function returns a static mutation to a param value we can outline the param and drop it

## Input

`````js filename=intro
function f(...x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = ~x;
  return y;
}

$(f(1));
$(f(2));
$(f('three'));
`````

## Pre Normal


`````js filename=intro
let f = function (...$$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = ~x;
  return y;
};
$(f(1));
$(f(2));
$(f(`three`));
`````

## Normalized


`````js filename=intro
let f = function (...$$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = ~x;
  return y;
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
const f /*:(unknown)=>*/ = function (...$$0) {
  const x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y /*:number*/ = ~x;
  return y;
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
  const d = ~b;
  return d;
};
const e = a( 1 );
$( e );
const f = a( 2 );
$( f );
const g = a( "three" );
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'no'
 - 2: 'inlining'
 - 3: 'please'
 - 4: -2
 - 5: 'no'
 - 6: 'inlining'
 - 7: 'please'
 - 8: -3
 - 9: 'no'
 - 10: 'inlining'
 - 11: 'please'
 - 12: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
