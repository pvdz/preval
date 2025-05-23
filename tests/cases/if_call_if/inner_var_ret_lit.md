# Preval test case

# inner_var_ret_lit.md

> If call if > Inner var ret lit
>
> Inner function has a var decl and returns a literal

Trying to hit an edge case

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
      var x = a();
      return 500;
    } else {
      a();
      return undefined;
    }
  };
  if (test) {
    b();
    return undefined;
  } else {
    test = $(2);
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
    $(100);
    return undefined;
  } else {
    $(2);
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
    $(100);
  } else {
    $(2);
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
    $( 100 );
    return undefined;
  }
  else {
    $( 2 );
    $( 100 );
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
  const a = function () {
    debugger;
    $(100);
    return undefined;
  };
  let test = $(1);
  const b = function () {
    debugger;
    let x = undefined;
    if (test) {
      x = a();
      return 500;
    } else {
      a();
      return undefined;
    }
  };
  if (test) {
    b();
    return undefined;
  } else {
    test = $(2);
    b();
    return undefined;
  }
};
$(f);
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
