# Preval test case

# decl_after_closured2_tdz.md

> Normalize > Dce > Return > Decl after closured2 tdz
>
> Can we DCE without worrying about things?
> In this case the code was inlining x even though it
> was triggering a tdz error before. By inlining it the
> tdz error was prevented.
> Either we don't inline constants when they are closures
> (because we can accurately detect it for non-closures)
> or we compile a reference to the var name in an attempt
> to retain tdz errors from the original code.

## Input

`````js filename=intro
let futureFunc = undefined;
$inlinedFunction: {
  const f = function() {
    $(x);
    return undefined;
  };
  futureFunc = f;
  break $inlinedFunction;
  const x = 0;
}
futureFunc();
`````


## Settled


`````js filename=intro
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: BAD!!
 - 1: 0
 - eval returned: undefined

Denormalized calls: BAD!!
 - 1: 0
 - eval returned: undefined
