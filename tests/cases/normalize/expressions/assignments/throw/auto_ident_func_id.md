# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Throw > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = function f() {});
$(a);
`````

## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
throw f;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {};
throw f;
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = function f() {
  debugger;
});
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const f = function () {
  debugger;
  return undefined;
};
a = f;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
throw a;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ function() {return undefined;} ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: BAD!!
 - eval returned: ('<crash[ function() {} ]>')
