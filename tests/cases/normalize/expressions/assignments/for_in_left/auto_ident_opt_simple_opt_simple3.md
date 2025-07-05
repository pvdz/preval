# Preval test case

# auto_ident_opt_simple_opt_simple3.md

> Normalize > Expressions > Assignments > For in left > Auto ident opt simple opt simple3
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpForInGenNext /*:unknown*/ = $forIn(tmpCalleeParam$1);
const tmpObjLitVal /*:object*/ = { y: $ };
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpForInNext /*:unknown*/ = tmpForInGenNext();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    a = undefined;
    const tmpChainElementObject /*:unknown*/ = tmpObjLitVal;
    const tmpIfTest$3 /*:boolean*/ = tmpChainElementObject == null;
    let tmpAssignMemLhsObj$1 /*:unknown*/ /*ternaryConst*/ = undefined;
    if (tmpIfTest$3) {
    } else {
      a = tmpChainElementObject.y;
      tmpAssignMemLhsObj$1 = a;
    }
  }
}
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { x: 1 };
const tmpForInGenNext /*:unknown*/ = $forIn(tmpCalleeParam$1);
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpForInNext /*:unknown*/ = tmpForInGenNext();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    a = $;
  }
}
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpForInGenNext = $forIn({ x: 1 });
while (true) {
  if (tmpForInGenNext().done) {
    break;
  } else {
    a = $;
  }
}
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = { x: 1 };
const c = $forIn( b );
while ($LOOP_NO_UNROLLS_LEFT) {
  const d = c();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    a = $;
  }
}
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = { x: 1 };
const tmpForInGenNext = $forIn(tmpCalleeParam$1);
const tmpObjLitVal = { y: $ };
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpForInNext = tmpForInGenNext();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    a = undefined;
    const tmpChainElementObject = tmpObjLitVal;
    const tmpIfTest$3 = tmpChainElementObject == null;
    let tmpAssignMemLhsObj$1 = undefined;
    if (tmpIfTest$3) {
    } else {
      a = tmpChainElementObject.y;
      tmpAssignMemLhsObj$1 = a;
    }
  }
}
$(a);
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
