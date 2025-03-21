# Preval test case

# param_vars_in_arrow.md

> Binding > Param vars in arrow
>
> Param that also has a var in same scope. Prettier (minified) does this.

## Input

`````js filename=intro
const f = (a) => {
  var a = $(10), b = $(20);
  return [a, b];
}
$(f());
`````

## Settled


`````js filename=intro
const tmpClusterSSA_a$1 /*:unknown*/ = $(10);
const b$1 /*:unknown*/ = $(20);
const tmpReturnArg /*:array*/ = [tmpClusterSSA_a$1, b$1];
$(tmpReturnArg);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a$1 = $(10);
const b$1 = $(20);
$([tmpClusterSSA_a$1, b$1]);
`````

## Pre Normal


`````js filename=intro
const f = ($$0) => {
  let a$1 = $$0;
  debugger;
  let b$1 = undefined;
  (a$1 = $(10)), (b$1 = $(20));
  return [a$1, b$1];
};
$(f());
`````

## Normalized


`````js filename=intro
const f = function ($$0) {
  let a$1 = $$0;
  debugger;
  let b$1 = undefined;
  a$1 = $(10);
  b$1 = $(20);
  const tmpReturnArg = [a$1, b$1];
  return tmpReturnArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
const b = $( 20 );
const c = [ a, b ];
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: [10, 20]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
