# Preval test case

# unused_label_loop.md

> Labels > Unused label loop
>
> Labels should not throw

## Input

`````js filename=intro
let x = 2;
foo: while (--x) $(x);
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 2;
while (true) {
  const tmpPostUpdArgIdent = $coerce(x, `number`);
  x = tmpPostUpdArgIdent - 1;
  const tmpIfTest = x;
  if (tmpIfTest) {
    $(x);
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
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
