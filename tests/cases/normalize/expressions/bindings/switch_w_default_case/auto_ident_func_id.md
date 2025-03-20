# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident func id
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = function f() {};
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
$(f);
$(`fail1`);
$(`fail2`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {});
$(`fail1`);
$(`fail2`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
$( a );
$( "fail1" );
$( "fail2" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: 'fail1'
 - 3: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
