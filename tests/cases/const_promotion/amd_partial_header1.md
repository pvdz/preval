# Preval test case

# amd_partial_header1.md

> Const promotion > Amd partial header1
>
> Or what's left of it after partial evaluation.

Why is the test not promoted to a const?

/*
  // Need to be able to configure this as globals somehow
  // Temp
  ['window', 'undefined'],
  ['self', 'undefined'],
  ['module', 'undefined'],
  ['exports', 'undefined'],
  ['require', 'undefined'],
  ['define', 'undefined'],
  ['global', 'object'],
*/

## Input

`````js filename=intro
let alwaysFalse = false;
const f = function () {
  if (alwaysFalse) {
    $('a');
  } else {
    $('b');
  }
};
if (alwaysFalse) {
  alwaysFalse = false;
  f();
} else {
  f();
}
`````


## Settled


`````js filename=intro
$(`b`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`b`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "b" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let alwaysFalse = false;
const f = function () {
  debugger;
  if (alwaysFalse) {
    $(`a`);
    return undefined;
  } else {
    $(`b`);
    return undefined;
  }
};
if (alwaysFalse) {
  alwaysFalse = false;
  f();
} else {
  f();
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
