# Preval test case

# var_write_func_decl_read.md

> Assigns > Var write func decl read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
var x;
$(1);
x = $(2); // this should not be constant unless we can figure out the func decl
function f() { $(x, 'f'); }
f();
`````

## Settled


`````js filename=intro
$(1);
const x /*:unknown*/ = $(2);
$(x, `f`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($(2), `f`);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
let f = function () {
  debugger;
  $(x, `f`);
};
$(1);
x = $(2);
f();
`````

## Normalized


`````js filename=intro
let x = undefined;
let f = function () {
  debugger;
  $(x, `f`);
  return undefined;
};
$(1);
x = $(2);
f();
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
$( a, "f" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2, 'f'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
