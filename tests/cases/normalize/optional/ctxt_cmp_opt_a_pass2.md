# Preval test case

# ctxt_cmp_opt_a_pass2.md

> Normalize > Optional > Ctxt cmp opt a pass2
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const tmpObjLitVal$1 /*:(array)=>unknown*/ = function (...$$0 /*:array*/) {
  const tmpPrevalAliasThis /*:object*/ = this;
  const a$1 /*:array*/ = $$0;
  debugger;
  const tmpCalleeParam /*:unknown*/ = $(a$1);
  $(tmpCalleeParam, tmpPrevalAliasThis);
};
const tmpObjLitVal /*:object*/ = { c: tmpObjLitVal$1 };
tmpObjLitVal.c();
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:(array)=>undefined*/ = function (...$$0 /*:array*/) {
  const tmpPrevalAliasThis$1 /*:object*/ = this;
  const $dlr_$$0 /*:array*/ = $$0;
  debugger;
  const tmpCalleeParam /*:unknown*/ = $($dlr_$$0);
  $(tmpCalleeParam, tmpPrevalAliasThis$1);
  return undefined;
};
const tmpObjLitVal /*:object*/ = { c: tmpObjLitVal$1 };
tmpObjLitVal.c();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = function (...$$0 /*:array*/) {
  const tmpPrevalAliasThis$1 = this;
  const $dlr_$$0 = $$0;
  $($($dlr_$$0), tmpPrevalAliasThis$1);
};
({ c: tmpObjLitVal$1 }.c());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = this;
  const c = $$0;
  debugger;
  const d = $( c );
  $( d, b );
  return undefined;
};
const e = { c: a };
e.c();
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: []
 - 2: [], { c: '"<function>"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
