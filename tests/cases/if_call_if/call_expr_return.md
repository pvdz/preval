# Preval test case

# call_expr_return.md

> If call if > Call expr return
>
> Debugging

## Input

`````js filename=intro
const f = function () {
  const a = function () {
    $(100)
    return undefined;
  };
  let test = $(1);
  const b = function () {
    if (test) {
      test = '';
      a();
      return undefined;
    } else {
      a();
      return undefined;
    }
  };
  if (test) {
    test = $(2);
    b();
    return undefined;
  } else {
    b();
    return undefined;
  }
};
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const test /*:unknown*/ = $(1);
  if (test) {
    $(2);
    $(100);
    return undefined;
  } else {
    $(100);
    return undefined;
  }
};
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {
  if ($(1)) {
    $(2);
    $(100);
  } else {
    $(100);
  }
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  if (b) {
    $( 2 );
    $( 100 );
    return undefined;
  }
  else {
    $( 100 );
    return undefined;
  }
};
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
