# Preval test case

# default_yes_no__obj_undefined.md

> Normalize > Pattern > Binding > Obj > Arr > Default yes no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [] = $(['fail']) } = { x: undefined, a: 11, b: 12 };
$('ok');
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`fail`];
const tmpOPAD /*:unknown*/ = $(tmpCalleeParam);
[...tmpOPAD];
$(`ok`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPAD = $([`fail`]);
[...tmpOPAD];
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


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


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
