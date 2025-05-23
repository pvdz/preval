# Preval test case

# unknown.md

> Type tracked > Invert > Unknown
>
> Inverting a value that we know is a falsy value must return true

## Input

`````js filename=intro
function f() {
  const x = $('truthy');
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
  const x /*:unknown*/ = $(`truthy`);
  if (x) {
    $(false, `fail`);
    $(x, `after`);
    return undefined;
  } else {
    $(true, `pass`);
    $(x, `after`);
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
  const x = $(`truthy`);
  if (x) {
    $(false, `fail`);
    $(x, `after`);
  } else {
    $(true, `pass`);
    $(x, `after`);
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
  if (b) {
    $( false, "fail" );
    $( b, "after" );
    return undefined;
  }
  else {
    $( true, "pass" );
    $( b, "after" );
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
  const x = $(`truthy`);
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
