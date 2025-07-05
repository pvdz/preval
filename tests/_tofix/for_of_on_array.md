# Preval test case

# for_of_on_array.md

> Tofix > for of on array

We can extrapolate and unroll a `for-of` on an array literal (or anything where we can predict the iterator behavior).
That means we can simplify the next to $(1) $(2) $(3). ymmv on how explosive that unroll would be with a huge while body, though.
Need to figure out how to pattern match it properly since we won't see it before it turns into a $forOf, but that's ok?
Same applies to $forIn on known objects, albeit slightly riskier due to inheritance. But that boat sailed anyways.

## Input

`````js filename=intro
const arr = [1, 2, 3];
for (const x of arr) $(x);
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [1, 2, 3];
const tmpForOfGenNext /*:unknown*/ = $forOf(arr);
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const x /*:unknown*/ = tmpForOfNext.value;
    $(x);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGenNext = $forOf([1, 2, 3]);
while (true) {
  const tmpForOfNext = tmpForOfGenNext();
  if (tmpForOfNext.done) {
    break;
  } else {
    $(tmpForOfNext.value);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = $forOf( a );
while ($LOOP_NO_UNROLLS_LEFT) {
  const c = b();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    const e = c.value;
    $( e );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
const tmpForOfGenNext = $forOf(arr);
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpForOfNext = tmpForOfGenNext();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const x = tmpForOfNext.value;
    $(x);
  }
}
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
