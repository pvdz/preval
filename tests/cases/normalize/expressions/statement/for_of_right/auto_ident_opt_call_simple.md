# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > For of right > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of $?.(1));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:boolean*/ = $ == null;
let tmpForOfGenNext /*:unknown*/ = undefined;
if (tmpIfTest) {
  tmpForOfGenNext = $forOf(undefined);
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  tmpForOfGenNext = $forOf(tmpChainElementCall);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
  const tmpIfTest$1 /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest$1) {
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
const tmpIfTest = $ == null;
let tmpForOfGenNext = undefined;
if (tmpIfTest) {
  tmpForOfGenNext = $forOf(undefined);
} else {
  tmpForOfGenNext = $forOf($(1));
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
  const c = $( 1 );
  b = $forOf( c );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = b();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    d.value;
  }
}
const f = {
  a: 999,
  b: 1000,
};
$( f );
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
