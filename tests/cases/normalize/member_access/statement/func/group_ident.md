# Preval test case

# group_ident.md

> Normalize > Member access > Statement > Func > Group ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
function f() {
  ($(1), $).length;
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
$.length;
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$.length;
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$.length;
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  $(1);
  const tmpCompObj = $;
  tmpCompObj.length;
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
