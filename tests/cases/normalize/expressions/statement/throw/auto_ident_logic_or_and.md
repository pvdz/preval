# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Throw > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw $($(0)) || ($($(1)) && $($(2)));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
let tmpThrowArg /*:unknown*/ = $(tmpCalleeParam);
if (tmpThrowArg) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpThrowArg = $(tmpCalleeParam$1);
  if (tmpThrowArg) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    tmpThrowArg = $(tmpCalleeParam$3);
  } else {
  }
}
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpThrowArg = $($(0));
if (!tmpThrowArg) {
  tmpThrowArg = $($(1));
  if (tmpThrowArg) {
    tmpThrowArg = $($(2));
  }
}
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  b = $( c );
  if (b) {
    const d = $( 2 );
    b = $( d );
  }
}
throw b;
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
