# Preval test case

# double_write_to_test_meta.md

> Unwind loops > Separate test > Double write to test meta
>
> Unrolling loops

## Input

`````js filename=intro
for (let i=0; i<0; ++i) {
  $(i);
  ++i;
}
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let i = 0;
while (true) {
  const tmpIfTest = i < 0;
  if (tmpIfTest) {
    $(i);
    const tmpPostUpdArgIdent = $coerce(i, `number`);
    i = tmpPostUpdArgIdent + 1;
    const tmpPostUpdArgIdent$1 = $coerce(i, `number`);
    i = tmpPostUpdArgIdent$1 + 1;
  } else {
    break;
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
