# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident s-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let x = 1;

  let a = ($(1), $(2), x);
  $(a, x);
}
$(f());
`````

## Settled


`````js filename=intro
$(1);
$(2);
$(1, 1);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
$(1, 1);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  let a = ($(1), $(2), x);
  $(a, x);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  $(1);
  $(2);
  let a = x;
  $(x, x);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( 1, 1 );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 1
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
