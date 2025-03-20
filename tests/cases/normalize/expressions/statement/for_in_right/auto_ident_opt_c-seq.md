# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Statement > For in right > Auto ident opt c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (let x in (1, 2, $(b))?.x);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpChainRootProp /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainRootProp == null;
let tmpForInGen /*:unknown*/ = undefined;
if (tmpIfTest) {
  tmpForInGen = $forIn(undefined);
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainRootProp.x;
  tmpForInGen = $forIn(tmpChainElementObject);
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
const tmpChainRootProp = $({ x: 1 });
const tmpIfTest = tmpChainRootProp == null;
let tmpForInGen = undefined;
if (tmpIfTest) {
  tmpForInGen = $forIn(undefined);
} else {
  tmpForInGen = $forIn(tmpChainRootProp.x);
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
const a = { x: 1 };
const b = $( a );
const c = b == null;
let d = undefined;
if (c) {
  d = $forIn( undefined );
}
else {
  const e = b.x;
  d = $forIn( e );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = d.next();
  const g = f.done;
  if (g) {
    break;
  }
  else {
    f.value;
  }
}
const h = {
  a: 999,
  b: 1000,
};
$( h );
`````


## Todos triggered


- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
