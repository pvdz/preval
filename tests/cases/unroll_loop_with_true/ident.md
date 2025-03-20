# Preval test case

# ident.md

> Unroll loop with true > Ident
>
>

## Input

`````js filename=intro
let f = function (a) {
  [...$LOOP_DONE_UNROLLING_ALWAYS_TRUE];
  return undefined;
};
f();
`````


## Settled


`````js filename=intro
[...$LOOP_DONE_UNROLLING_ALWAYS_TRUE];
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
[...$LOOP_DONE_UNROLLING_ALWAYS_TRUE];
`````


## PST Settled
With rename=true

`````js filename=intro
[ ...$LOOP_DONE_UNROLLING_ALWAYS_TRUE ];
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
