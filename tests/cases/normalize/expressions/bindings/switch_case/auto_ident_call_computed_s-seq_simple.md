# Preval test case

# auto_ident_call_computed_s-seq_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident call computed s-seq simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = (1, 2, b)["$"](1);
    $(a);
}
`````

## Settled


`````js filename=intro
const tmpClusterSSA_b /*:object*/ = { $: $ };
const tmpClusterSSA_a /*:unknown*/ = tmpClusterSSA_b.$(1);
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ $: $ }.$(1));
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let b;
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    b = { $: $ };
    a = (1, 2, b)[`\$`](1);
    $(a);
  } else {
  }
}
`````

## Normalized


`````js filename=intro
let b = undefined;
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  b = { $: $ };
  const tmpCallObj = b;
  a = tmpCallObj.$(1);
  $(a);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = a.$( 1 );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
