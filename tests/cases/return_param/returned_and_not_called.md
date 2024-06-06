# Preval test case

# returned_and_not_called.md

> Return param > Returned and not called
>
> Returning a static param mutation but also reading it so we can't just eliminate it

#TODO

## Input

`````js filename=intro
function f(g) {
  $('a')
  $('b')
  $('c')
  let y = g(1);
  return y;
}
$(f(function(a){ $(a, 'first'); }));
$(f(function(a){ $(a, 'second'); }));
$(f(function(a){ $(a, 'third'); }));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let g = $$0;
  debugger;
  $(`a`);
  $(`b`);
  $(`c`);
  let y = g(1);
  return y;
};
$(
  f(function ($$0) {
    let a = $$0;
    debugger;
    $(a, `first`);
  }),
);
$(
  f(function ($$0) {
    let a$1 = $$0;
    debugger;
    $(a$1, `second`);
  }),
);
$(
  f(function ($$0) {
    let a$3 = $$0;
    debugger;
    $(a$3, `third`);
  }),
);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let g = $$0;
  debugger;
  $(`a`);
  $(`b`);
  $(`c`);
  let y = g(1);
  return y;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = function ($$0) {
  let a = $$0;
  debugger;
  $(a, `first`);
  return undefined;
};
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$3 = $;
const tmpCallCallee$5 = f;
const tmpCalleeParam$5 = function ($$0) {
  let a$1 = $$0;
  debugger;
  $(a$1, `second`);
  return undefined;
};
const tmpCalleeParam$3 = tmpCallCallee$5(tmpCalleeParam$5);
tmpCallCallee$3(tmpCalleeParam$3);
const tmpCallCallee$7 = $;
const tmpCallCallee$9 = f;
const tmpCalleeParam$9 = function ($$0) {
  let a$3 = $$0;
  debugger;
  $(a$3, `third`);
  return undefined;
};
const tmpCalleeParam$7 = tmpCallCallee$9(tmpCalleeParam$9);
tmpCallCallee$7(tmpCalleeParam$7);
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  $(`a`);
  $(`b`);
  $(`c`);
  return undefined;
};
f();
$(1, `first`);
$(undefined);
f();
$(1, `second`);
$(undefined);
f();
$(1, `third`);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "a" );
  $( "b" );
  $( "c" );
  return undefined;
};
a();
$( 1, "first" );
$( undefined );
a();
$( 1, "second" );
$( undefined );
a();
$( 1, "third" );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'c'
 - 4: 1, 'first'
 - 5: undefined
 - 6: 'a'
 - 7: 'b'
 - 8: 'c'
 - 9: 1, 'second'
 - 10: undefined
 - 11: 'a'
 - 12: 'b'
 - 13: 'c'
 - 14: 1, 'third'
 - 15: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
