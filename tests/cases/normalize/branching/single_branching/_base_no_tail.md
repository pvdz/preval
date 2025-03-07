# Preval test case

# _base_no_tail.md

> Normalize > Branching > Single branching > Base no tail
>
> A function with one branch should not be split

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    return $(2);
  } else {
    return $(3);
  }
}
$(f(), 'final');
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpReturnArg /*:unknown*/ = $(2);
  $(tmpReturnArg, `final`);
} else {
  const tmpReturnArg$1 /*:unknown*/ = $(3);
  $(tmpReturnArg$1, `final`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $($(2), `final`);
} else {
  $($(3), `final`);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($(1)) {
    return $(2);
  } else {
    return $(3);
  }
};
$(f(), `final`);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = $(3);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam, `final`);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 2 );
  $( b, "final" );
}
else {
  const c = $( 3 );
  $( c, "final" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
