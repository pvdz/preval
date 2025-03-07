# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Param default > Auto this
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = this)) {}
$(f());
$(a);
`````

## Settled


`````js filename=intro
$(undefined);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpPrevalAliasThis = this;
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = tmpPrevalAliasThis) : tmpParamBare;
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpPrevalAliasThis = this;
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    a = tmpPrevalAliasThis;
    p = tmpPrevalAliasThis;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
