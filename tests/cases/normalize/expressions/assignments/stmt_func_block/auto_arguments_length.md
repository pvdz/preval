# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Stmt func block > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

## Options

- expectBad

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = arguments;
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpPrevalAliasArgumentsAny /*:array*/ /*truthy*/ = [];
$(tmpPrevalAliasArgumentsAny);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([]);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
$( a );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  let a = { a: 999, b: 1000 };
  a = tmpPrevalAliasArgumentsAny;
  $(tmpPrevalAliasArgumentsAny);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: BAD!! (expected)
 - !1: []
 -  2: undefined
 -  eval returned: undefined

Denormalized calls: BAD!! (expected)
 - !1: []
 -  2: undefined
 -  eval returned: undefined
