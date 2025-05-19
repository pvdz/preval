# Preval test case

# try_hell_k.md

> Flow > Try finally throw early > Try hell k
>
> Bunch of try/catch/finally cases

## Options

- globals: throw_early

## Input

`````js filename=intro
let x = 0;
foo: {
  try {
    break foo;
  } catch {
  
  } finally {
    throw_early
    // The finally always executes so there's no question that x mutates
    x = 1
  }
}
$(x);
`````


## Settled


`````js filename=intro
throw_early;
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw_early;
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
throw_early;
$( 1 );
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
