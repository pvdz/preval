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
let tmpForOfGen /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = $ == null;
if (tmpIfTest) {
  tmpForOfGen = $forOf(undefined);
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  tmpForOfGen = $forOf(tmpChainElementCall);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
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
let tmpForOfGen = undefined;
if ($ == null) {
  tmpForOfGen = $forOf(undefined);
} else {
  tmpForOfGen = $forOf($(1));
}
while (true) {
  const tmpForOfNext = tmpForOfGen.next();
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
let a = undefined;
const b = $ == null;
if (b) {
  a = $forOf( undefined );
}
else {
  const c = $( 1 );
  a = $forOf( c );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = a.next();
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


- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next


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
