# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > For c > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); $?.(1));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 /*:boolean*/ = $ == null;
  if (tmpIfTest$1) {
  } else {
    $(1);
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(1);
    if (tmpIfTest$2) {
      const tmpIfTest$4 /*:boolean*/ = $ == null;
      if (tmpIfTest$4) {
      } else {
        $(1);
      }
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  if (!($ == null)) {
    $(1);
  }
  while (true) {
    if ($(1)) {
      if (!($ == null)) {
        $(1);
      }
    } else {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $ == null;
  if (b) {

  }
  else {
    $( 1 );
  }
  while ($LOOP_UNROLL_10) {
    const c = $( 1 );
    if (c) {
      const d = $ == null;
      if (d) {

      }
      else {
        $( 1 );
      }
    }
    else {
      break;
    }
  }
}
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpChainRootCall = $;
    const tmpIfTest$1 = tmpChainRootCall != null;
    if (tmpIfTest$1) {
      const tmpChainElementCall = tmpChainRootCall(1);
    } else {
    }
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


None


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
