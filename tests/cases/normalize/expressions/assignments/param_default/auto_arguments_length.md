# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Param default > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = arguments)) {}
$(f());
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const f /*:(unused)=>undefined*/ = function ($$0) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
  debugger;
  a = tmpPrevalAliasArgumentsAny;
  return undefined;
};
f();
$(undefined);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const f = function ($$0) {
  a = arguments;
};
f();
$(undefined);
$(a);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = tmpPrevalAliasArgumentsAny) : tmpParamBare;
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    a = tmpPrevalAliasArgumentsAny;
    p = tmpPrevalAliasArgumentsAny;
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
let a = {
  a: 999,
  b: 1000,
};
const b = function($$0 ) {
  const c = d;
  debugger;
  a = c;
  return undefined;
};
b();
$( undefined );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
