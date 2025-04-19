# Preval test case

# default_yes_no__empty2.md

> Normalize > Pattern > Binding > Obj > Arr > Default yes no  empty2
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [] = ['fail'] } = 1;
$('ok');
`````


## Settled


`````js filename=intro
const tmpOPBD /*:unknown*/ = $Number_prototype.x;
let tmpOPAD /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  tmpOPAD = [`fail`];
} else {
  tmpOPAD = tmpOPBD;
}
[...tmpOPAD];
$(`ok`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $Number_prototype.x;
let tmpOPAD = undefined;
if (tmpOPBD === undefined) {
  tmpOPAD = [`fail`];
} else {
  tmpOPAD = tmpOPBD;
}
[...tmpOPAD];
$(`ok`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.x;
let b = undefined;
const c = a === undefined;
if (c) {
  b = [ "fail" ];
}
else {
  b = a;
}
[ ...b ];
$( "ok" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
