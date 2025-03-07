# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident func anon
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let a = function () {};
  $(a);
}
`````

## Settled


`````js filename=intro
const a /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {});
`````

## Pre Normal


`````js filename=intro
{
  let a = function () {
    debugger;
  };
  $(a);
}
`````

## Normalized


`````js filename=intro
let a = function () {
  debugger;
  return undefined;
};
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
