# Preval test case

# this2.md

> Normalize > Expressions > Assignments > Param default > This2
>
> Normalization of assignments should work the same everywhere they are

Trying to make sure that `f` is not inlined since that would break context stuff.

## Input

`````js filename=intro
function g() {
  let a = { a: 999, b: 1000 };
  function f(p = (a = this)) {}
  $(f());
  $(a);
}
if ($) $(g());
`````


## Settled


`````js filename=intro
if ($) {
  $(undefined);
  $(undefined);
  $(undefined);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(undefined);
  $(undefined);
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( undefined );
  $( undefined );
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let g = function () {
  debugger;
  let f = function ($$0) {
    const tmpPrevalAliasThis = this;
    const tmpParamBare = $$0;
    debugger;
    let p = undefined;
    const tmpIfTest = tmpParamBare === undefined;
    if (tmpIfTest) {
      a = tmpPrevalAliasThis;
      p = tmpPrevalAliasThis;
      return undefined;
    } else {
      p = tmpParamBare;
      return undefined;
    }
  };
  let a = { a: 999, b: 1000 };
  let tmpCalleeParam = f();
  $(tmpCalleeParam);
  $(a);
  return undefined;
};
if ($) {
  let tmpCalleeParam$1 = g();
  $(tmpCalleeParam$1);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
