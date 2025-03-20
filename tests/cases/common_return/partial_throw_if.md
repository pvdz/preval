# Preval test case

# partial_throw_if.md

> Common return > Partial throw if
>
> When a function throws the return value should still be assumed to be whatever is actually returned.

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    return 15;
  } else {
    throw 'Some error';
  }
}
f();
f();
f();
f();
$(f());
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const tmpIfTest /*:unknown*/ = $(1);
  if (tmpIfTest) {
    return undefined;
  } else {
    throw `Some error`;
  }
};
f();
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
  const tmpIfTest = $(1);
  if (!tmpIfTest) {
    throw `Some error`;
  }
};
f();
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
  const b = $( 1 );
  if (b) {
    return undefined;
  }
  else {
    throw "Some error";
  }
};
a();
a();
a();
a();
a();
$( 15 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
