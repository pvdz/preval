# Preval test case

# forin_break2.md

> Ref tracking > Done > Forin > Forin break2
>
> bloop

## Input

`````js filename=intro
const wat = { a: 1, b: 2 };
for (const x in wat) {
  $(x);
  break;
}
$();
`````


## Settled


`````js filename=intro
const wat /*:object*/ = { a: 1, b: 2 };
const tmpForInGen /*:unknown*/ = $forIn(wat);
const tmpForInNext /*:unknown*/ = tmpForInGen.next();
const tmpIfTest /*:unknown*/ = tmpForInNext.done;
if (tmpIfTest) {
  $();
} else {
  const x /*:unknown*/ = tmpForInNext.value;
  $(x);
  $();
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInNext = $forIn({ a: 1, b: 2 }).next();
if (tmpForInNext.done) {
  $();
} else {
  $(tmpForInNext.value);
  $();
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $forIn( a );
const c = b.next();
const d = c.done;
if (d) {
  $();
}
else {
  const e = c.value;
  $( e );
  $();
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
