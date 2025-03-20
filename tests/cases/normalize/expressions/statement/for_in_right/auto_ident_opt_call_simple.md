# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > For in right > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in $?.(1));
$(a);
`````


## Settled


`````js filename=intro
let tmpForInGen /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = $ == null;
if (tmpIfTest) {
  tmpForInGen = $forIn(undefined);
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  tmpForInGen = $forIn(tmpChainElementCall);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest$1 /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest$1) {
    break;
  } else {
    tmpForInNext.value;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpForInGen = undefined;
if ($ == null) {
  tmpForInGen = $forIn(undefined);
} else {
  tmpForInGen = $forIn($(1));
}
while (true) {
  const tmpForInNext = tmpForInGen.next();
  if (tmpForInNext.done) {
    break;
  } else {
    tmpForInNext.value;
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
  a = $forIn( undefined );
}
else {
  const c = $( 1 );
  a = $forIn( c );
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


- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
