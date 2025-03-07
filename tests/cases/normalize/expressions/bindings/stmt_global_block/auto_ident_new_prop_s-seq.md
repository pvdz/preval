# Preval test case

# auto_ident_new_prop_s-seq.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident new prop s-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let b = { $ };

  let a = new (1, 2, b).$(1);
  $(a);
}
`````

## Settled


`````js filename=intro
const a /*:object*/ = new $(1);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(new $(1));
`````

## Pre Normal


`````js filename=intro
{
  let b = { $: $ };
  let a = new (1, 2, b).$(1);
  $(a);
}
`````

## Normalized


`````js filename=intro
let b = { $: $ };
const tmpCompObj = b;
const tmpNewCallee = tmpCompObj.$;
let a = new tmpNewCallee(1);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
