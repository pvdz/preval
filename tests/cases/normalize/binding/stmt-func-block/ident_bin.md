# Preval test case

# ident_bin.md

> Normalize > Binding > Stmt-func-block > Ident bin
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f(){
  if ($(true)) {
    let b = 2, c = 3;
    let a= b + c;
    $(a, b, c);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(5, 2, 3);
  $(undefined);
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(5, 2, 3);
  $(undefined);
} else {
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 5, 2, 3 );
  $( undefined );
}
else {
  $( undefined );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 5, 2, 3
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
