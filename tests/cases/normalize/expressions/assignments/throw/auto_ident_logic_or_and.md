# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > Throw > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = $($(0)) || ($($(1)) && $($(2))));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
let a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$1);
  if (a) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$3);
  } else {
  }
}
throw a;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(0));
if (!a) {
  a = $($(1));
  if (a) {
    a = $($(2));
  }
}
throw a;
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(0);
a = $(tmpCalleeParam);
if (a) {
} else {
  let tmpCalleeParam$1 = $(1);
  a = $(tmpCalleeParam$1);
  if (a) {
    let tmpCalleeParam$3 = $(2);
    a = $(tmpCalleeParam$3);
  } else {
  }
}
const tmpThrowArg = a;
throw tmpThrowArg;
`````


## Todos triggered


None


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
