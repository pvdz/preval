# Preval test case

# partial_throw_else.md

> Common return > Partial throw else
>
> When a function throws the return value should still be assumed to be whatever is actually returned.

## Input

`````js filename=intro
function f() {
  if ($(0)) {
    throw 'Some error';
  } else {
    return 15;
  }
}
f();
f();
f();
$(f());
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const tmpIfTest /*:unknown*/ = $(0);
  if (tmpIfTest) {
    throw `Some error`;
  } else {
    return undefined;
  }
};
f();
f();
f();
f();
$(15);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  if ($(0)) {
    throw `Some error`;
  }
};
f();
f();
f();
f();
$(15);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 0 );
  if (b) {
    throw "Some error";
  }
  else {
    return undefined;
  }
};
a();
a();
a();
a();
$( 15 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 0
 - 4: 0
 - 5: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
