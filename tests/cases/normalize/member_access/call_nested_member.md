# Preval test case

# call_nested_member.md

> Normalize > Member access > Call nested member
>
> Calling a nested object structure should cache one level but not break the context

## Input

`````js filename=intro
const obj = {a: {b: {c: () => $(1)}}};
obj.a.b.c();
`````

## Settled


`````js filename=intro
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````

## Pre Normal


`````js filename=intro
const obj = {
  a: {
    b: {
      c: () => {
        debugger;
        return $(1);
      },
    },
  },
};
obj.a.b.c();
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$3 = function () {
  debugger;
  const tmpReturnArg = $(1);
  return tmpReturnArg;
};
const tmpObjLitVal$1 = { c: tmpObjLitVal$3 };
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpCompObj = obj.a;
const tmpCallObj = tmpCompObj.b;
tmpCallObj.c();
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
