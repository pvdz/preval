# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > For of right > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
for (let x of b?.c.d.e?.(1));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest$1 /*:boolean*/ = $ == null;
let tmpForOfGenNext /*:unknown*/ = undefined;
if (tmpIfTest$1) {
  tmpForOfGenNext = $forOf(undefined);
} else {
  const tmpObjLitVal$1 /*:object*/ = { e: $ };
  const tmpCalleeParam /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
  tmpForOfGenNext = $forOf(tmpCalleeParam);
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
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest$1 = $ == null;
let tmpForOfGenNext = undefined;
if (tmpIfTest$1) {
  tmpForOfGenNext = $forOf(undefined);
} else {
  tmpForOfGenNext = $forOf($dotCall($, { e: $ }, `e`, 1));
}
while (true) {
  const tmpForOfNext = tmpForOfGenNext();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
let b = undefined;
if (a) {
  b = $forOf( undefined );
}
else {
  const c = { e: $ };
  const d = $dotCall( $, c, "e", 1 );
  b = $forOf( d );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = b();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    e.value;
  }
}
const g = {
  a: 999,
  b: 1000,
};
$( g );
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
