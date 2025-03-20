# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident cond c-seq s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (10, 20, $(30)) ? (40, 50, 60) : $($(100));
$(a);
`````


## Settled


`````js filename=intro
let tmpThrowArg /*:unknown*/ = 60;
const tmpIfTest /*:unknown*/ = $(30);
if (tmpIfTest) {
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  tmpThrowArg = $(tmpCalleeParam);
}
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpThrowArg = 60;
if (!$(30)) {
  tmpThrowArg = $($(100));
}
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 60;
const b = $( 30 );
if (b) {

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
 - eval returned: ('<crash[ 60 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
