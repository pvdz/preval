# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident call computed simple complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = b[$("$")](1);
    $(a);
  }
}
$(f());
`````

## Settled


`````js filename=intro
const tmpCallCompProp /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const a /*:unknown*/ = b[tmpCallCompProp](1);
$(a);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCompProp = $(`\$`);
$({ $: $ }[tmpCallCompProp](1));
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let b = { $: $ };
    let a = b[$(`\$`)](1);
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
  const tmpCallCompObj = b;
  const tmpCallCompProp = $(`\$`);
  let a = tmpCallCompObj[tmpCallCompProp](1);
  $(a);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ]( 1 );
$( c );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
