# Preval test case

# alias_used_as_default_value.md

> Ternary alias > Ai silly contrived > Alias used as default value
>
> b is used as a default value: should NOT replace

## Input

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
if (x) {} else { b = a; }
function f(x = b) { return x; }
// Expect: No change, default value context is not safe
`````


## Settled


`````js filename=intro
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let x$1 = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    x$1 = b;
    return x$1;
  } else {
    x$1 = tmpParamBare;
    return x$1;
  }
};
const x = $(true);
let a = undefined;
let b = undefined;
if (x) {
} else {
  b = a;
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
