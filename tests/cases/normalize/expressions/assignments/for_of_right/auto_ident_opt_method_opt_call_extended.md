# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > For of right > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
for (let x of (a = b?.c.d.e?.(1)));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = $ == null;
let tmpForOfGenNext /*:unknown*/ /*ternaryConst*/ = undefined;
if (tmpIfTest$1) {
  tmpForOfGenNext = $forOf(undefined);
} else {
  const tmpObjLitVal$1 /*:object*/ = { e: $ };
  a = $dotCall($, tmpObjLitVal$1, `e`, 1);
  tmpForOfGenNext = $forOf(a);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
  const tmpIfTest$3 /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest$3) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpIfTest$1 = $ == null;
let tmpForOfGenNext = undefined;
if (tmpIfTest$1) {
  tmpForOfGenNext = $forOf(undefined);
} else {
  a = $dotCall($, { e: $ }, `e`, 1);
  tmpForOfGenNext = $forOf(a);
}
while (true) {
  const tmpForOfNext = tmpForOfGenNext();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
let c = undefined;
if (b) {
  c = $forOf( undefined );
}
else {
  const d = { e: $ };
  a = $dotCall( $, d, "e", 1 );
  c = $forOf( a );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = c();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    e.value;
  }
}
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
