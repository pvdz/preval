# Preval test case

# arguments.md

> Ifelse > Arguments
>
> Return this

## Options

- expectBad

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    if ($(2)) {
      return arguments;
    }
  }
}
const obj = {f, foo: 10};
$(obj.f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(2);
  if (tmpIfTest$1) {
    const tmpClusterSSA_tmpCalleeParam /*:array*/ /*truthy*/ = [];
    $(tmpClusterSSA_tmpCalleeParam);
  } else {
    $(undefined);
  }
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  if ($(2)) {
    $([]);
  } else {
    $(undefined);
  }
} else {
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 2 );
  if (b) {
    const c = [];
    $( c );
  }
  else {
    $( undefined );
  }
}
else {
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(2);
    if (tmpIfTest$1) {
      return tmpPrevalAliasArgumentsAny;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
const obj = { f: f, foo: 10 };
const tmpMCF = obj.f;
let tmpCalleeParam = $dotCall(tmpMCF, obj, `f`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type ReturnStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: BAD!! (expected)
 -  1: 1
 -  2: 2
 - !3: []
 -  eval returned: undefined

Denormalized calls: BAD!! (expected)
 -  1: 1
 -  2: 2
 - !3: []
 -  eval returned: undefined
