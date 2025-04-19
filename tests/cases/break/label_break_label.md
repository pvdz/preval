# Preval test case

# label_break_label.md

> Break > Label break label
>
> Just random things
> The hack: { break hack } thing should also be removed

## Input

`````js filename=intro
function f() {
  try {
    return 1;
  } finally {
    hack: break hack; // Spoilers: does not cancel the return
  }
  return 2;
}
$(f()); // 1
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
