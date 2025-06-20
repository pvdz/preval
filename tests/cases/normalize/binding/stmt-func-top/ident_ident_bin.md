# Preval test case

# ident_ident_bin.md

> Normalize > Binding > Stmt-func-top > Ident ident bin
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f() {
  let  b = 2, c = 3, d = 4;
  let a = b = c + d;
  $(a, b, c);
}
$(f());
`````


## Settled


`````js filename=intro
$(7, 7, 3);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(7, 7, 3);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 7, 7, 3 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = 2;
  let c = 3;
  let d = 4;
  b = c + d;
  let a = b;
  $(b, b, c);
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
 - 1: 7, 7, 3
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
