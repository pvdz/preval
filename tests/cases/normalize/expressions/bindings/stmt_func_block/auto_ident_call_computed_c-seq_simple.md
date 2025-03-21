# Preval test case

# auto_ident_call_computed_c-seq_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident call computed c-seq simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = (1, 2, $(b))["$"](1);
    $(a);
  }
}
$(f());
`````

## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCallObj /*:unknown*/ = $(b);
const a /*:unknown*/ = tmpCallObj.$(1);
$(a);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($({ $: $ }).$(1));
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let b = { $: $ };
    let a = (1, 2, $(b))[`\$`](1);
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
  const tmpCallObj = $(b);
  let a = tmpCallObj.$(1);
  $(a);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$( 1 );
$( c );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
