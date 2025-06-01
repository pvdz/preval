# Preval test case

# alias_assigned_in_loop.md

> Ternary alias > Ai silly contrived > Alias assigned in loop
>
> b assigned in a loop: should NOT replace

## Input

`````js filename=intro
let a = undefined;
let b = undefined;
for (let i = 0; i < 10; i++) { b = a; }
$(b);
// Expect: No change, assignment in loop is not safe
`````


## Settled


`````js filename=intro
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let b = undefined;
let i = 0;
while (true) {
  const tmpIfTest = i < 10;
  if (tmpIfTest) {
    b = a;
    const tmpPostUpdArgIdent = $coerce(i, `number`);
    i = tmpPostUpdArgIdent + 1;
  } else {
    break;
  }
}
$(b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
