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
  const x$1 /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
  if (x$1) {
    $(false, `fail`);
    $(x$1, `after`);
    return undefined;
  } else {
    $(true, `pass`);
    $(``, `after`);
    return undefined;
  }
};
f();
f();
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const x$1 = $coerce($(``), `plustr`);
  if (x$1) {
    $(false, `fail`);
    $(x$1, `after`);
  } else {
    $(true, `pass`);
    $(``, `after`);
  }
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
    $( c, "after" );
    return undefined;
  }
  else {
    $( true, "pass" );
    $( "", "after" );
    return undefined;
  }
};
a();
a();
a();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpBinBothLhs = ``;
  const tmpBinBothRhs = $(``);
  const x = tmpBinBothLhs + tmpBinBothRhs;
  if (x) {
    let tmpCalleeParam = false;
    $(tmpCalleeParam, `fail`);
    $(x, `after`);
    return undefined;
  } else {
    let tmpCalleeParam$1 = true;
    $(tmpCalleeParam$1, `pass`);
    $(x, `after`);
    return undefined;
  }
};
f();
f();
f();
`````


## Todos triggered


None


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
