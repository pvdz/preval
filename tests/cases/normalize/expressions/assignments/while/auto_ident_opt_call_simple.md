# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > While > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $?.(1))) $(100);
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = $ == null;
if (tmpIfTest$1) {
} else {
  a = $(1);
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpIfTest$2 /*:boolean*/ = $ == null;
    if (tmpIfTest$2) {
    } else {
      a = $(1);
    }
    if (a) {
    } else {
      break;
    }
  }
  $(a);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
if (!($ == null)) {
  a = $(1);
}
if (a) {
  while (true) {
    $(100);
    if (!($ == null)) {
      a = $(1);
    }
    if (!a) {
      break;
    }
  }
  $(a);
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
if (b) {

}
else {
  a = $( 1 );
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const c = $ == null;
    if (c) {

    }
    else {
      a = $( 1 );
    }
    if (a) {

    }
    else {
      break;
    }
  }
  $( a );
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  a = undefined;
  const tmpChainRootCall = $;
  const tmpIfTest$1 = tmpChainRootCall != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = tmpChainRootCall(1);
    a = tmpChainElementCall;
  } else {
  }
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) Support referencing this builtin in isFree: $
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 1
 - 4: 100
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 100
 - 9: 1
 - 10: 100
 - 11: 1
 - 12: 100
 - 13: 1
 - 14: 100
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 100
 - 19: 1
 - 20: 100
 - 21: 1
 - 22: 100
 - 23: 1
 - 24: 100
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
