# Preval test case

# base_false.md

> Type tracked > Invert > Base false
>
> Inverting a value that we know is a falsy value must return true

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

## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const tmpBinBothRhs /*:unknown*/ = $(``);
  const x /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
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

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const x = $coerce($(``), `plustr`);
  if (x) {
    $(false, `fail`);
  } else {
    $(true, `pass`);
  }
  $(x, `after`);
};
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
    const tmpCalleeParam = !x;
    $(tmpCalleeParam, `fail`);
  } else {
    const tmpCalleeParam$1 = !x;
    $(tmpCalleeParam$1, `pass`);
  }
  $(x, `after`);
  return undefined;
};
f();
f();
f();
`````

## PST Settled
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

## Runtime Outcome

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

Post settled calls: Same

Denormalized calls: Same
