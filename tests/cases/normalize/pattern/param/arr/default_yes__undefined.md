# Preval test case

# default_yes__undefined.md

> Normalize > Pattern > Param > Arr > Default yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([] = $('pass')) {
  return 'ok';
}
$(f(undefined, 200));
`````


## Settled


`````js filename=intro
const bindingPatternArrRoot /*:unknown*/ = $(`pass`);
[...bindingPatternArrRoot];
$(`ok`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const bindingPatternArrRoot = $(`pass`);
[...bindingPatternArrRoot];
$(`ok`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "pass" );
[ ...a ];
$( "ok" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
