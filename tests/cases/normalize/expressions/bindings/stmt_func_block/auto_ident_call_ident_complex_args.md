# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident call ident complex args
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = $($(1), $(2));
    $(a);
  }
}
$(f());
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const a /*:unknown*/ = $(tmpCalleeParam, tmpCalleeParam$1);
$(a);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(1);
$($(tmpCalleeParam, $(2)));
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let b = { $: $ };
    let a = $($(1), $(2));
    $(a);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = { $: $ };
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  let a = $(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
  return undefined;
};
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = $( a, b );
$( c );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
