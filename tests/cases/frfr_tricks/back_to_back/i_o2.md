# Preval test case

# i_o2.md

> Frfr tricks > Back to back > I o2
>
> back to back $frfr calls

## Input

`````js filename=intro
let g = function $free($$0) {
  let x = $$0;
  debugger;
  const r = $frfr(f, x);
  return r;
};
const f = function $free($$0, $$1) {
  let y = $$0;
  debugger;
  const r2 = y;
  return r2;
};
const x = $();
let xs = x + '';
let rs = $frfr(g, xs);
$(rs);

`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $();
const rs /*:string*/ = $coerce(x, `plustr`);
$(rs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($coerce($(), `plustr`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = $coerce( a, "plustr" );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let g = function $free($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  let x$1 = $dlr_$$0;
  const r = $frfr(f, $dlr_$$0);
  return r;
};
const f = function $free($$0, $$1) {
  let $dlr_$$1 = $$0;
  let $dlr_$$3 = $$1;
  debugger;
  return $dlr_$$1;
};
const x = $();
let xs = $coerce(x, `plustr`);
let rs = $frfr(g, xs);
$(rs);
`````


## Todos triggered


- (todo) frfr and free arg mismatch


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 'undefined'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
