# Preval test case

# base_true.md

> Type tracked > Invert > Base true
>
> Inverting a value that we know is a falsy value must return true

#TODO

## Input

`````js filename=intro
function f() {
  const x = '' + $('truthy');
  if (x) {
    $(!x, 'fail');
  } else {
    $(!x, 'pass');
  }
  $(x, 'after');
}
f();
f();
f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const x = `` + $(`truthy`);
  if (x) {
    $(!x, `fail`);
  } else {
    $(!x, `pass`);
  }
  $(x, `after`);
};
f();
f();
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpBinBothLhs = ``;
  const tmpBinBothRhs = $(`truthy`);
  const x = tmpBinBothLhs + tmpBinBothRhs;
  if (x) {
    const tmpCallCallee = $;
    const tmpCalleeParam = !x;
    const tmpCalleeParam$1 = `fail`;
    tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$3 = !x;
    const tmpCalleeParam$5 = `pass`;
    tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
  }
  $(x, `after`);
  return undefined;
};
f();
f();
f();
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  const tmpBinBothRhs = $(`truthy`);
  const x = $coerce(tmpBinBothRhs, `plustr`);
  if (x) {
    $(false, `fail`);
  } else {
    $(true, `pass`);
  }
  $(x, `after`);
  return undefined;
};
f();
f();
f();
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( "truthy" );
  const c = $coerce( b, "plustr" );
  if (c) {
    $( false, "fail" );
  }
  else {
    $( true, "pass" );
  }
  $( c, "after" );
  return undefined;
};
a();
a();
a();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'truthy'
 - 2: false, 'fail'
 - 3: 'truthy', 'after'
 - 4: 'truthy'
 - 5: false, 'fail'
 - 6: 'truthy', 'after'
 - 7: 'truthy'
 - 8: false, 'fail'
 - 9: 'truthy', 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
