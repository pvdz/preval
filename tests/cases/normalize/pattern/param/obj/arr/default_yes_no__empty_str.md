# Preval test case

# default_yes_no__empty_str.md

> Normalize > Pattern > Param > Obj > Arr > Default yes no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [] = $(['fail']) }) {
  return 'ok';
}
$(f('', 10));
`````


## Settled


`````js filename=intro
const tmpOPBD /*:unknown*/ = $String_prototype.x;
let tmpOPAD /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  const tmpCalleeParam /*:array*/ = [`fail`];
  tmpOPAD = $(tmpCalleeParam);
} else {
  tmpOPAD = tmpOPBD;
}
[...tmpOPAD];
$(`ok`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $String_prototype.x;
let tmpOPAD = undefined;
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
const a = $String_prototype.x;
let b = undefined;
const c = a === undefined;
if (c) {
  const d = [ "fail" ];
  b = $( d );
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
 - 1: ['fail']
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
