# Preval test case

# auto_ident_call_prop_s-seq.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident call prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ((1, 2, b).$(1)) {
  default:
    $(100);
}
$(a);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
b.$(1);
$(100);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
({ $: $ }.$(1));
$(100);
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (1, 2, b).$(1);
  if (true) {
    $(100);
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallObj = b;
const tmpSwitchDisc = tmpCallObj.$(1);
$(100);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
a.$( 1 );
$( 100 );
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
