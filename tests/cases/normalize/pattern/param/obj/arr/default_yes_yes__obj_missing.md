# Preval test case

# default_yes_yes__obj_missing.md

> Normalize > Pattern > Param > Obj > Arr > Default yes yes  obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [] = $(['fail']) } = $({ x: ['fail2'] })) {
  return 'ok';
}
$(f({ a: 11, b: 12 }, 10));
`````


## Settled


`````js filename=intro
let tmpOPAD /*:unknown*/ = undefined;
const tmpOPBD /*:unknown*/ = $Object_prototype.x;
const tmpIfTest$1 /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:array*/ = [`fail`];
  tmpOPAD = $(tmpCalleeParam$1);
} else {
  tmpOPAD = tmpOPBD;
}
[...tmpOPAD];
$(`ok`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpOPAD = undefined;
const tmpOPBD = $Object_prototype.x;
if (tmpOPBD === undefined) {
  tmpOPAD = $([`fail`]);
} else {
  tmpOPAD = tmpOPBD;
}
[...tmpOPAD];
$(`ok`);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $Object_prototype.x;
const c = b === undefined;
if (c) {
  const d = [ "fail" ];
  a = $( d );
}
else {
  a = b;
}
[ ...a ];
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
