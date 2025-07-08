# Preval test case

# with_arg_len.md

> Inline identical param > Builtin > With arg len
>
> When a function is always called with a certain primitive for a certain parameter then we can inline this safely in many cases.

In this case the param can also be eliminated. But that's not always possible, like with `arguments.length` (unless that is also replaced with the actual count).

## Input

`````js filename=intro
function f(a, b, c) {
  if ($) {
    $(a, b, c, arguments.length, 'hopefully b is a literal afterwards');
  }
}
f($Math_pow, 2, 3);
f($Math_pow, 2, 5);
f($Math_pow, 2, 7);
f($Math_pow, 2, 9);
`````


## Settled


`````js filename=intro
const f /*:(number)=>undefined*/ = function ($$0) {
  const c /*:number*/ = $$0;
  debugger;
  if ($) {
    $($Math_pow, 2, c, 3, `hopefully b is a literal afterwards`);
    return undefined;
  } else {
    return undefined;
  }
};
f(3);
f(5);
f(7);
f(9);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (c) {
  if ($) {
    $($Math_pow, 2, c, 3, `hopefully b is a literal afterwards`);
  }
};
f(3);
f(5);
f(7);
f(9);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  if ($) {
    $( $Math_pow, 2, b, 3, "hopefully b is a literal afterwards" );
    return undefined;
  }
  else {
    return undefined;
  }
};
a( 3 );
a( 5 );
a( 7 );
a( 9 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1, $$2) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  if ($) {
    $(a, b, c, tmpPrevalAliasArgumentsLen, `hopefully b is a literal afterwards`);
    return undefined;
  } else {
    return undefined;
  }
};
f($Math_pow, 2, 3);
f($Math_pow, 2, 5);
f($Math_pow, 2, 7);
f($Math_pow, 2, 9);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>', 2, 3, 3, 'hopefully b is a literal afterwards'
 - 2: '<function>', 2, 5, 3, 'hopefully b is a literal afterwards'
 - 3: '<function>', 2, 7, 3, 'hopefully b is a literal afterwards'
 - 4: '<function>', 2, 9, 3, 'hopefully b is a literal afterwards'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
