# Preval test case

# spread_param_binary.md

> Return param > Spread param binary
>
> If a function returns a static mutation to a param value we can outline the param and drop it

## Input

`````js filename=intro
function f(...x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = x + 500;
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
  const y = x + 500;
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
  const y = x + 500;
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
const f /*:(unknown)=>primitive*/ = function (...$$0) {
  const x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y /*:primitive*/ = x + 500;
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
  const b = $$0;
  debugger;
  $( "no" );
  $( "inlining" );
  $( "please" );
  const c = b + 500;
  return c;
};
const d = a( 1 );
$( d );
const e = a( 2 );
$( e );
const f = a( "three" );
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'no'
 - 2: 'inlining'
 - 3: 'please'
 - 4: '1500'
 - 5: 'no'
 - 6: 'inlining'
 - 7: 'please'
 - 8: '2500'
 - 9: 'no'
 - 10: 'inlining'
 - 11: 'please'
 - 12: 'three500'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
