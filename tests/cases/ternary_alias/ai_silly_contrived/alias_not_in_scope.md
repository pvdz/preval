# Preval test case

# alias_not_in_scope.md

> Ternary alias > Ai silly contrived > Alias not in scope
>
> a is not in scope at b's read: should NOT replace

## Input

`````js filename=intro
let b = undefined; let x = true;
{
  let a = undefined;
  if (x) {} else { b = a; }
}
$(b);
// Expect: No change, a is not in scope at read
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
let b = undefined;
let x = true;
let a = undefined;
if (x) {
  $(b);
} else {
  b = a;
  $(a);
}
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
