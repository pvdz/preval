# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Assignments > Throw > Auto ident cond c-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = (10, 20, $(30)) ? $(2) : $($(100)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(30);
let tmpThrowArg /*:unknown*/ = undefined;
if (tmpIfTest) {
  const tmpClusterSSA_a /*:unknown*/ = $(2);
  tmpThrowArg = tmpClusterSSA_a;
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam);
  tmpThrowArg = tmpClusterSSA_a$1;
}
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(30);
let tmpThrowArg = undefined;
if (tmpIfTest) {
  tmpThrowArg = $(2);
} else {
  tmpThrowArg = $($(100));
}
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 30 );
let b = undefined;
if (a) {
  const c = $( 2 );
  b = c;
}
else {
  const d = $( 100 );
  const e = $( d );
  b = e;
}
throw b;
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 2
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
