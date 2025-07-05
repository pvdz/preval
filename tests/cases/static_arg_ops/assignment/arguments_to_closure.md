# Preval test case

# arguments_to_closure.md

> Static arg ops > Assignment > Arguments to closure
>
> This was detected as closure to closure

## Options

- expectBad

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = arguments);
}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpPrevalAliasArgumentsAny /*:array*/ /*truthy*/ = [];
$(tmpPrevalAliasArgumentsAny);
$(tmpPrevalAliasArgumentsAny);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpPrevalAliasArgumentsAny = [];
$(tmpPrevalAliasArgumentsAny);
$(tmpPrevalAliasArgumentsAny);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
$( a );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  a = tmpPrevalAliasArgumentsAny;
  return a;
};
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) support Identifier as var init in let_hoisting noob check
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type ReturnStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: BAD!! (expected)
 - !1: []
 - !2: []
 -  eval returned: undefined

Denormalized calls: BAD!! (expected)
 - !1: []
 - !2: []
 -  eval returned: undefined
