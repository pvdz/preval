# Preval test case

# unnnecessary.md

> Dot call > Unnnecessary
>
> Dont need dotcall on a func that does not access `this`

## Input

`````js filename=intro
function f(arg) {
  if (arg) $('x');
}
f.call({}, $(1));
`````


## Settled


`````js filename=intro
const tmpMCP$1 /*:unknown*/ = $(1);
if (tmpMCP$1) {
  $(`x`);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(`x`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( "x" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let arg = $$0;
  debugger;
  if (arg) {
    $(`x`);
    return undefined;
  } else {
    return undefined;
  }
};
const tmpMCF = f.call;
const tmpMCP = {};
const tmpMCP$1 = $(1);
$dotCall(tmpMCF, f, `call`, tmpMCP, tmpMCP$1);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_call


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'x'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
