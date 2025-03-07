# Preval test case

# block_bad_ref_after2.md

> Normalize > Hoisting > Func > Block bad ref after2
>
> Block hoisting func decls

In strict mode the funcdecl is a hoisted lexical binding, not a var binding.

## Input

`````js filename=intro
{
  f(); // ok
  function f(){ $(1); } // this is let f = function(){}
}
f(); // Fails in strict mode (would be fine otherwise)
`````

## Settled


`````js filename=intro
$(1);
f();
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
f();
`````

## Pre Normal


`````js filename=intro
{
  let f$1 = function () {
    debugger;
    $(1);
  };
  f$1();
}
f();
`````

## Normalized


`````js filename=intro
let f$1 = function () {
  debugger;
  $(1);
  return undefined;
};
f$1();
f();
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
f();
`````

## Globals

BAD@! Found 1 implicit global bindings:

f

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
