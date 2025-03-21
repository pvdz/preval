# Preval test case

# variable_count_arg_len.md

> Inline identical param > Primitive > Variable count arg len
>
> When a function is always called with a certain primitive for a certain parameter then we can inline this safely in many cases.

This case explicitly uses `arguments.length` and has variable arg counts

## Input

`````js filename=intro
function f(a, b, c, d) {
  if ($) {
    $(a, b, c, d, arguments.length, 'hopefully b is a literal afterwards');
  }
}
f(1, 2, 3, 'oops');
f(4, 2, 5);
f(6, 2, 7);
f(8, 2, 9);
`````


## Settled


`````js filename=intro
const f /*:(number, number, number, primitive)=>undefined*/ = function ($$0, $$1, $$2, $$3) {
  const tmpPrevalAliasArgumentsLen /*:number*/ = arguments.length;
  const a /*:number*/ = $$0;
  const b /*:number*/ = $$1;
  const c /*:number*/ = $$2;
  const d /*:primitive*/ = $$3;
  debugger;
  if ($) {
    $(a, b, c, d, tmpPrevalAliasArgumentsLen, `hopefully b is a literal afterwards`);
    return undefined;
  } else {
    return undefined;
  }
};
f(1, 2, 3, `oops`);
f(4, 2, 5);
f(6, 2, 7);
f(8, 2, 9);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (a, b, c, d) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  if ($) {
    $(a, b, c, d, tmpPrevalAliasArgumentsLen, `hopefully b is a literal afterwards`);
  }
};
f(1, 2, 3, `oops`);
f(4, 2, 5);
f(6, 2, 7);
f(8, 2, 9);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2,$$3 ) {
  const b = c.length;
  const d = $$0;
  const e = $$1;
  const f = $$2;
  const g = $$3;
  debugger;
  if ($) {
    $( d, e, f, g, b, "hopefully b is a literal afterwards" );
    return undefined;
  }
  else {
    return undefined;
  }
};
a( 1, 2, 3, "oops" );
a( 4, 2, 5 );
a( 6, 2, 7 );
a( 8, 2, 9 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 2, 3, 'oops', 4, 'hopefully b is a literal afterwards'
 - 2: 4, 2, 5, undefined, 3, 'hopefully b is a literal afterwards'
 - 3: 6, 2, 7, undefined, 3, 'hopefully b is a literal afterwards'
 - 4: 8, 2, 9, undefined, 3, 'hopefully b is a literal afterwards'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
