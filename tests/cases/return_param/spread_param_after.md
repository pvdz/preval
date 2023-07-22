# Preval test case

# spread_param_after.md

> Return param > Spread param after
>
> If a function returns a static mutation to a param value we can outline the param and drop it

#TODO

## Input

`````js filename=intro
function f(x, ...rest) {
  $('no', rest);
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
let f = function ($$0, ...$$1) {
  let x = $$0;
  let rest = $$1;
  debugger;
  $(`no`, rest);
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
let f = function ($$0, ...$$1) {
  let x = $$0;
  let rest = $$1;
  debugger;
  $(`no`, rest);
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
const f = function () {
  debugger;
  const rest = [];
  $(`no`, rest);
  $(`inlining`);
  $(`please`);
  return undefined;
};
f();
$(-2);
f();
$(-3);
f();
$(-1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = [];
  $( "no", b );
  $( "inlining" );
  $( "please" );
  return undefined;
};
a();
$( -2 );
a();
$( -3 );
a();
$( -1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'no', []
 - 2: 'inlining'
 - 3: 'please'
 - 4: -2
 - 5: 'no', []
 - 6: 'inlining'
 - 7: 'please'
 - 8: -3
 - 9: 'no', []
 - 10: 'inlining'
 - 11: 'please'
 - 12: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
