# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Stmt func top > Auto this
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = this;
  $(a);
}
$(f());
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
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  let a = { a: 999, b: 1000 };
  a = tmpPrevalAliasThis;
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  let a = { a: 999, b: 1000 };
  a = tmpPrevalAliasThis;
  $(tmpPrevalAliasThis);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
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
