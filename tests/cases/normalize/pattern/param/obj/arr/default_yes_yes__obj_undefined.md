# Preval test case

# default_yes_yes__obj_undefined.md

> Normalize > Pattern > Param > Obj > Arr > Default yes yes  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [] = $(['fail']) } = $({ x: ['fail2'] })) {
  return 'ok';
}
$(f({ x: undefined, a: 11, b: 12 }, 10));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ = [`fail`];
const objPatternAfterDefault /*:unknown*/ = $(tmpCalleeParam$1);
[...objPatternAfterDefault];
$(`ok`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternAfterDefault = $([`fail`]);
[...objPatternAfterDefault];
$(`ok`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "fail" ];
const b = $( a );
[ ...b ];
$( "ok" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['fail']
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
