# Preval test case

# alias_used_as_spread.md

> Ternary alias > Ai silly contrived > Alias used as spread
>
> b is used as a spread argument: should NOT replace

## Input

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
if (x) {} else { b = a; }
let arr = [...b];
// Expect: No change, spread context is not safe
`````


## Settled


`````js filename=intro
$(true);
throw `Preval: Array spread on non-string primitive must crash (caused by \`[...undefined];\`)`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
throw `Preval: Array spread on non-string primitive must crash (caused by \`[...undefined];\`)`;
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
throw "Preval: Array spread on non-string primitive must crash (caused by `[...undefined];`)";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
if (x) {
} else {
  b = a;
}
let arr = [...b];
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
