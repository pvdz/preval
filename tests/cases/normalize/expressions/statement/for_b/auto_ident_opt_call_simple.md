# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > For b > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $?.(1); $(1));
$(a);
`````

## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = $ == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  tmpIfTest = tmpChainElementCall;
}
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(1);
    let tmpIfTest$2 /*:unknown*/ = undefined;
    const tmpIfTest$4 /*:boolean*/ = $ == null;
    if (tmpIfTest$4) {
    } else {
      const tmpChainElementCall$1 /*:unknown*/ = $(1);
      tmpIfTest$2 = tmpChainElementCall$1;
    }
    if (tmpIfTest$2) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = undefined;
if (!($ == null)) {
  tmpIfTest = $(1);
}
if (tmpIfTest) {
  while (true) {
    $(1);
    let tmpIfTest$2 = undefined;
    if (!($ == null)) {
      tmpIfTest$2 = $(1);
    }
    if (!tmpIfTest$2) {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($?.(1)) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpChainRootCall = $;
  const tmpIfTest$1 = tmpChainRootCall != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = tmpChainRootCall(1);
    tmpIfTest = tmpChainElementCall;
  } else {
  }
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
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
    let d = undefined;
    const e = $ == null;
    if (e) {

    }
    else {
      const f = $( 1 );
      d = f;
    }
    if (d) {

    }
    else {
      break;
    }
  }
}
const g = {
  a: 999,
  b: 1000,
};
$( g );
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

Todos triggered:
- Support referencing this builtin in isFree: $