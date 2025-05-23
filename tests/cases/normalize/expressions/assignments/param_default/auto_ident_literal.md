# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Param default > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = "foo")) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
$(undefined);
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( "foo" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    a = `foo`;
    p = `foo`;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
