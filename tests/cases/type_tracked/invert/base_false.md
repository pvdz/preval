# Preval test case

# base_false.md

> Type tracked > Invert > Base false
>
> Inverting a value that we know is a falsy value must return true

#TODO

## Input

`````js filename=intro
function f() {
  const x = '' + $('');
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
  const x = `` + $(``);
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
  const tmpBinBothRhs = $(``);
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
  const tmpBinBothRhs = $(``);
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
  const b = $( "" );
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
 - 1: ''
 - 2: true, 'pass'
 - 3: '', 'after'
 - 4: ''
 - 5: true, 'pass'
 - 6: '', 'after'
 - 7: ''
 - 8: true, 'pass'
 - 9: '', 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
