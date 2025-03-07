# Preval test case

# with_ident_non_func.md

> Object literal > Inlining > With ident non func
>
>

## Input

`````js filename=intro
let g = function(){ 
  return 'wat';
}
const obj = {f: g};
$(obj.f());
const tmp = function(){ g = 1; };
$(tmp());
$(obj.f());
`````

## Settled


`````js filename=intro
$(`wat`);
$(undefined);
$(`wat`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`wat`);
$(undefined);
$(`wat`);
`````

## Pre Normal


`````js filename=intro
let g = function () {
  debugger;
  return `wat`;
};
const obj = { f: g };
$(obj.f());
const tmp = function () {
  debugger;
  g = 1;
};
$(tmp());
$(obj.f());
`````

## Normalized


`````js filename=intro
let g = function () {
  debugger;
  return `wat`;
};
const obj = { f: g };
const tmpCalleeParam = obj.f();
$(tmpCalleeParam);
const tmp = function () {
  debugger;
  g = 1;
  return undefined;
};
const tmpCalleeParam$1 = tmp();
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = obj.f();
$(tmpCalleeParam$3);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "wat" );
$( undefined );
$( "wat" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'wat'
 - 2: undefined
 - 3: 'wat'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
