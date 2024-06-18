# Preval test case

# multi_use_b.md

> Return param > Multi use b
>
> If a function returns a static mutation to a param value we can outline the param and drop it

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = ~x;
  if ($(false)) {
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
  const y = ~x;
  if ($(false)) {
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
  const y = ~x;
  const tmpIfTest = $(false);
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
const f = function () {
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const tmpIfTest = $(false);
  if (tmpIfTest) {
    $(`a`);
    return undefined;
  } else {
    $(`b`);
    return undefined;
  }
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
  $( "no" );
  $( "inlining" );
  $( "please" );
  const b = $( false );
  if (b) {
    $( "a" );
    return undefined;
  }
  else {
    $( "b" );
    return undefined;
  }
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
 - 1: 'no'
 - 2: 'inlining'
 - 3: 'please'
 - 4: false
 - 5: 'b'
 - 6: -2
 - 7: 'no'
 - 8: 'inlining'
 - 9: 'please'
 - 10: false
 - 11: 'b'
 - 12: -3
 - 13: 'no'
 - 14: 'inlining'
 - 15: 'please'
 - 16: false
 - 17: 'b'
 - 18: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
