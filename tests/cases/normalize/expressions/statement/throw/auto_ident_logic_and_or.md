# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Throw > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw ($($(1)) && $($(1))) || $($(2));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpThrowArg /*:unknown*/ = $(tmpCalleeParam);
if (tmpThrowArg) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpThrowArg = $(tmpCalleeParam$1);
} else {
}
if (tmpThrowArg) {
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  tmpThrowArg = $(tmpCalleeParam$3);
}
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpThrowArg = $($(1));
if (tmpThrowArg) {
  tmpThrowArg = $($(1));
}
if (!tmpThrowArg) {
  tmpThrowArg = $($(2));
}
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
if (b) {

}
else {
  const d = $( 2 );
  b = $( d );
}
throw b;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(1);
let tmpThrowArg = $(tmpCalleeParam);
if (tmpThrowArg) {
  let tmpCalleeParam$1 = $(1);
  tmpThrowArg = $(tmpCalleeParam$1);
} else {
}
if (tmpThrowArg) {
} else {
  let tmpCalleeParam$3 = $(2);
  tmpThrowArg = $(tmpCalleeParam$3);
}
throw tmpThrowArg;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
