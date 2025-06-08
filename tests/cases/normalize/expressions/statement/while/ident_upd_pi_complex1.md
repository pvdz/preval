# Preval test case

# ident_upd_pi_complex1.md

> Normalize > Expressions > Statement > While > Ident upd pi complex1
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = {x: 5};
let t = true;
while (t) {
  let p = --b.x;
  t = p;
  $(100);
}
$(b);
`````


## Settled


`````js filename=intro
$(100);
$(100);
$(100);
$(100);
$(100);
const b /*:object*/ /*truthy*/ = { x: 0 };
$(b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(100);
$(100);
$(100);
$(100);
$({ x: 0 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
const a = { x: 0 };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 5 };
let t = true;
while (true) {
  if (t) {
    const tmpUpdObj = b;
    const tmpUpdProp = tmpUpdObj.x;
    const tmpUpdNum = $coerce(tmpUpdProp, `number`);
    const tmpUpdInc = tmpUpdNum - 1;
    tmpUpdObj.x = tmpUpdInc;
    let p = tmpUpdInc;
    t = p;
    $(100);
  } else {
    break;
  }
}
$(b);
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 100
 - 4: 100
 - 5: 100
 - 6: { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
