# Preval test case

# default_yes_no__obj_empty_str.md

> Normalize > Pattern > Assignment > Obj > Ident > Default yes no  obj empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x = $('fail') } = { x: '' });
$(x);
`````


## Settled


`````js filename=intro
x = ``;
$(``);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = ``;
$(``);
`````


## PST Settled
With rename=true

`````js filename=intro
x = "";
$( "" );
`````


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
