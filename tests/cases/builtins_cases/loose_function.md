# Preval test case

# loose_function.md

> Builtins cases > Loose function
>
> This is from a jsfk case

## Input

`````js filename=intro
// Note: this is an octal escape, illegal in strict mode, but Function does not inherit that
const ok = Function('return "\\44"'); // 0o44 = $
$(ok());
`````


## Settled


`````js filename=intro
$(`\$`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`\$`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "$" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '$'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
