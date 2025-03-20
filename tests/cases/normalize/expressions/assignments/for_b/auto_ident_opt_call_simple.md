# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > For b > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = $?.(1)); $(1));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = $ == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  a = tmpChainElementCall;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpIfTest$2 /*:boolean*/ = $ == null;
    if (tmpIfTest$2) {
    } else {
      const tmpChainElementCall$1 /*:unknown*/ = $(1);
      a = tmpChainElementCall$1;
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
    $(1);
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
  const c = $( 1 );
  a = c;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const d = $ == null;
    if (d) {

    }
    else {
      const e = $( 1 );
      a = e;
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


## Todos triggered


- objects in isFree check
- Support referencing this builtin in isFree: $


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
