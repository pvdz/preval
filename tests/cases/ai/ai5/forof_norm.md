# Preval test case

# forof_norm.md

> Ai > Ai5 > Forof norm
>
> Test for-of normalization

## Input

`````js filename=intro
const arr = [1, 2, 3];
const sum = 0;
for (let item of arr) {
    $(item);  // Track item
    sum = sum + item;
}
$(sum);

// Expected:
// const arr = [1, 2, 3];
// const sum = 0;
// const iter = $forOf(arr);
// while (true) {
//     const item = iter.next();
//     if (item.done) {
//         break;
//     }
//     $(item.value);
//     sum = sum + item.value;
// }
// $(sum);
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [1, 2, 3];
const tmpForOfGenNext /*:unknown*/ = $forOf(arr);
const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
if (tmpIfTest) {
  $(0);
} else {
  const item /*:unknown*/ = tmpForOfNext.value;
  $(item);
  throw `Preval: Cannot write to const binding \`sum\``;
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGenNext = $forOf([1, 2, 3]);
const tmpForOfNext = tmpForOfGenNext();
if (tmpForOfNext.done) {
  $(0);
} else {
  $(tmpForOfNext.value);
  throw `Preval: Cannot write to const binding \`sum\``;
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = $forOf( a );
const c = b();
const d = c.done;
if (d) {
  $( 0 );
}
else {
  const e = c.value;
  $( e );
  throw "Preval: Cannot write to const binding `sum`";
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
const sum = 0;
const tmpForOfGenNext = $forOf(arr);
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpForOfNext = tmpForOfGenNext();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let item = tmpForOfNext.value;
    $(item);
    sum = sum + item;
  }
}
$(sum);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) fixme: spyless vars and labeled nodes


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ Assignment to constant variable. ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
