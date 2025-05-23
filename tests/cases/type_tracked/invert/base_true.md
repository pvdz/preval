# Preval test case

# base_true.md

> Type tracked > Invert > Base true
>
> Inverting a value that we know is a falsy value must return true

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


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const tmpBinBothRhs /*:unknown*/ = $(`truthy`);
  const x /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
  if (x) {
    $(false, `fail`);
    $(x, `after`);
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
  const x = $coerce($(`truthy`), `plustr`);
  if (x) {
    $(false, `fail`);
    $(x, `after`);
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
  const b = $( "truthy" );
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
  const tmpBinBothRhs = $(`truthy`);
  const x = tmpBinBothLhs + tmpBinBothRhs;
  if (x) {
    let tmpCalleeParam = !x;
    $(tmpCalleeParam, `fail`);
    $(x, `after`);
    return undefined;
  } else {
    let tmpCalleeParam$1 = !x;
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

Post settled calls: Same

Denormalized calls: Same
