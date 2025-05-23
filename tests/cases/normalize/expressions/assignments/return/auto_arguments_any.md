# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > Return > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

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
let a /*:unknown*/ = { a: 999, b: 1000 };
const f /*:()=>arguments*/ = function () {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
  debugger;
  a = tmpPrevalAliasArgumentsAny;
  return tmpPrevalAliasArgumentsAny;
};
const tmpCalleeParam /*:arguments*/ = f();
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const f = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  a = tmpPrevalAliasArgumentsAny;
  return tmpPrevalAliasArgumentsAny;
};
$(f());
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = function() {
  const c = d;
  debugger;
  a = c;
  return c;
};
const e = b();
$( e );
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


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
