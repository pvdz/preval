# Preval test case

# alias_write_between_reads.md

> Ternary alias > Ai silly contrived > Alias write between reads
>
> Write to aliased var between reads

## Input

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
if (x) {} else { b = a; }
$(b);
a = 2;
$(b);
// Expect: No change, a is written between reads
`````


## Settled


`````js filename=intro
$(true);
$(undefined);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(undefined);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( undefined );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
if (x) {
  $(b);
} else {
  b = a;
  $(a);
}
a = 2;
$(b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
