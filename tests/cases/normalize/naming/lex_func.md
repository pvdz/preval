# Preval test case

# lex_func.md

> Normalize > Naming > Lex func
>
> First a block binding shadowing a later outer binding in a function

## Input

`````js filename=intro
function f() {
  {
    let a = $(1);
    $(a);
    if ($()) return a; 
  }
  let a = $(1);
  $(a);
  return a;
}
$(f());
`````


## Settled


`````js filename=intro
const a$1 /*:unknown*/ = $(1);
$(a$1);
const tmpIfTest /*:unknown*/ = $();
if (tmpIfTest) {
  $(a$1);
} else {
  const a /*:unknown*/ = $(1);
  $(a);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a$1 = $(1);
$(a$1);
if ($()) {
  $(a$1);
} else {
  const a = $(1);
  $(a);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
const b = $();
if (b) {
  $( a );
}
else {
  const c = $( 1 );
  $( c );
  $( c );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
