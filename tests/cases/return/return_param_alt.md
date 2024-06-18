# Preval test case

# return_param_alt.md

> Return > Return param alt
>
> A function that returns an alteration of its param

## Input

`````js filename=intro
function f(a) {
  $('stop');
  $('the');
  $('inlining');
  return a | 16;
}
$(f(1));
$(f(2));
$(f('three'));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  $(`stop`);
  $(`the`);
  $(`inlining`);
  return a | 16;
};
$(f(1));
$(f(2));
$(f(`three`));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  $(`stop`);
  $(`the`);
  $(`inlining`);
  const tmpReturnArg = a | 16;
  return tmpReturnArg;
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
  $(`stop`);
  $(`the`);
  $(`inlining`);
  return undefined;
};
f();
$(17);
f();
$(18);
f();
$(16);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "stop" );
  $( "the" );
  $( "inlining" );
  return undefined;
};
a();
$( 17 );
a();
$( 18 );
a();
$( 16 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'stop'
 - 2: 'the'
 - 3: 'inlining'
 - 4: 17
 - 5: 'stop'
 - 6: 'the'
 - 7: 'inlining'
 - 8: 18
 - 9: 'stop'
 - 10: 'the'
 - 11: 'inlining'
 - 12: 16
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
