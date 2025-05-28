# Preval test case

# default_yes_no__obj_undefined.md

> Normalize > Pattern > Assignment > Obj > Ident > Default yes no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x = $('pass') } = { x: undefined });
$(x);
`````


## Settled


`````js filename=intro
x = $(`pass`);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = $(`pass`);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
x = $( "pass" );
$( x );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpAssignObjPatternRhs = { x: undefined };
const tmpOPBD = tmpAssignObjPatternRhs.x;
const tmpIfTest = tmpOPBD === undefined;
if (tmpIfTest) {
  x = $(`pass`);
  $(x);
} else {
  x = tmpOPBD;
  $(tmpOPBD);
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - eval returned: ('<crash[ Cannot set property x of #<Object> which has only a getter ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
