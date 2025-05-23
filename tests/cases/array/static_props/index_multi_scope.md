# Preval test case

# index_multi_scope.md

> Array > Static props > Index multi scope
>
> The immediate access should be resolved because we can guarantee the value

## Input

`````js filename=intro
const arr = [1, $, 3];
function f() {
  if ($) {
    $(arr[1]);
  } else {
    return ;  
  }

  $('end')
}
f();
// Prevent inlining
f();
f();
f();
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  if ($) {
    $($);
    $(`end`);
    return undefined;
  } else {
    return undefined;
  }
};
f();
f();
f();
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  if ($) {
    $($);
    $(`end`);
  }
};
f();
f();
f();
f();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  if ($) {
    $( $ );
    $( "end" );
    return undefined;
  }
  else {
    return undefined;
  }
};
a();
a();
a();
a();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    let tmpCalleeParam = arr[1];
    $(tmpCalleeParam);
    $(`end`);
    return undefined;
  } else {
    return undefined;
  }
};
const arr = [1, $, 3];
f();
f();
f();
f();
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 'end'
 - 3: '<$>'
 - 4: 'end'
 - 5: '<$>'
 - 6: 'end'
 - 7: '<$>'
 - 8: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
