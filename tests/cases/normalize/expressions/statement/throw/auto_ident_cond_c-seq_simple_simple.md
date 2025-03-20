# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident cond c-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (10, 20, $(30)) ? $(2) : $($(100));
$(a);
`````


## Settled


`````js filename=intro
let tmpThrowArg /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(30);
if (tmpIfTest) {
  tmpThrowArg = $(2);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  tmpThrowArg = $(tmpCalleeParam);
}
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpThrowArg = undefined;
if ($(30)) {
  tmpThrowArg = $(2);
} else {
  tmpThrowArg = $($(100));
}
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 30 );
if (b) {
  a = $( 2 );
}
else {
  const c = $( 100 );
  a = $( c );
}
throw a;
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
