# Preval test case

# try_hell_d.md

> Flow > Try no throw > Try hell d
>
> Bunch of try/catch/finally cases

## Input

`````js filename=intro
let x = 0;
try {
  x = 1
} catch {

} finally {

}
$(x);
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
let x = 0;
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  x = 1;
} catch (e) {}
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  $(x);
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal


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
