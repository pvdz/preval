# Preval test case

# try_hell_i.md

> Flow > Try catch throw early > Try hell i
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
    throw_early
  } finally {
    // The finally always executes so there's no question that x mutates
    x = 1
  }
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
