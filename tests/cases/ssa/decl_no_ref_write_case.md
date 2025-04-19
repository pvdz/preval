# Preval test case

# decl_no_ref_write_case.md

> Ssa > Decl no ref write case
>
> This case is where a decl is followed by a write with only statements that either have no observable side effects in them or a ref that is not in the same scope or one with an observable side effect before the first ref was found (since in that case there can not be closure access, whatever it is doing).

## Input

`````js filename=intro
const tmpArrElement$513 = function () {
  // We want to SSA this needle
  let needle = undefined;
  // This is an observable side effect. But since the needle was not seen yet, this can't
  // be affecting it so it shouldn't block SSA. 
  $(144);
  // These will contain needles but they're not side effects on this level. Not blocking SSA.
  const a = function () {
    needle.f();
  };
  // This is the first ref to needle in this scope (and block).
  // Since the previous statements were a call to an unknown function before needle was referenced and
  // and a reference in a closure, we conclude that there can be no side effects that can observe needle
  // before this write, meaning the initial decl is unobserved, unused, and can be eliminated (or SSA'd).
  needle = { a };

  $(needle);
  return undefined;
};
if ($) tmpArrElement$513();
`````


## Settled


`````js filename=intro
if ($) {
  $(144);
  const a /*:()=>undefined*/ = function () {
    debugger;
    const tmpCallCompVal /*:unknown*/ = needle.f;
    $dotCall(tmpCallCompVal, needle, `f`);
    return undefined;
  };
  const needle /*:object*/ = { a: a };
  $(needle);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(144);
  const a = function () {
    needle.f();
  };
  const needle = { a: a };
  $(needle);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( 144 );
  const a = function() {
    debugger;
    const b = c.f;
    $dotCall( b, c, "f" );
    return undefined;
  };
  const c = { a: a };
  $( c );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 144
 - 2: { a: '"<function>"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
