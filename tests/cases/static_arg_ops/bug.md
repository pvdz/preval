# Preval test case

# bug.md

> Static arg ops > Bug
>
> This trips a bug in staticArgOpOutlining,

function b would end up with an implicit global var `tmpSaooB$1` in the
true branch and that global would also replace the number arg.

The problem was that g wants to split because it's only the `if` statement
while `h` wants to outline the first statement. But that's deferred and by
the time the queue gets processed, `g` was already split so only one func
gets updated, leaving the other in disarray.

## Input

`````js filename=intro
const f = function() {
  debugger;
  h(1);
  g(unknown);
  g(unknown2);
  return undefined;
};
const g = function($$0) {
  const $dlr_$$0 = $$0;
  debugger;
  if ($dlr_$$0) {
    h(709);
    return undefined;
  } else {
    return undefined;
  }
};
$(f);
const h = function($$0) {
  const $dlr_$$1 = $$0;
  debugger;
  const y = $dlr_$$1 - 345;
  arr[y];
  return undefined;
};
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  arr[-344];
  if (unknown) {
    arr[364];
  } else {
  }
  if (unknown2) {
    arr[364];
    return undefined;
  } else {
    return undefined;
  }
};
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {
  arr[-344];
  if (unknown) {
    arr[364];
  }
  if (unknown2) {
    arr[364];
  }
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  arr[ -344 ];
  if (unknown) {
    arr[ 364 ];
  }
  if (unknown2) {
    arr[ 364 ];
    return undefined;
  }
  else {
    return undefined;
  }
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
  debugger;
  h(1);
  g(unknown);
  g(unknown2);
  return undefined;
};
const g = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const $dlr_$$1 = $dlr_$$0;
  if ($dlr_$$1) {
    h(709);
    return undefined;
  } else {
    return undefined;
  }
};
$(f);
const h = function ($$0) {
  let $dlr_$$3 = $$0;
  debugger;
  const $dlr_$$5 = $dlr_$$3;
  const y = $dlr_$$5 - 345;
  arr[y];
  return undefined;
};
`````


## Todos triggered


None


## Globals


BAD@! Found 3 implicit global bindings:

arr, unknown, unknown2


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
