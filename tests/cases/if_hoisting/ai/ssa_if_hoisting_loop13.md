# Preval test case

# ssa_if_hoisting_loop13.md

> If hoisting > Ai > Ssa if hoisting loop13
>
> Test if_hoisting and SSA infinite loop: identical var declarations with template literals

## Input

`````js filename=intro
const mode = $("mode");
if (mode) {
  let template1 = `value: ${42}`;
  $(template1);
} else {
  let template2 = `value: ${42}`;
  $(template2);
}
`````


## Settled


`````js filename=intro
$(`mode`);
$(`value: 42`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`mode`);
$(`value: 42`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "mode" );
$( "value: 42" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const mode = $(`mode`);
if (mode) {
  const tmpBinBothLhs = `value: `;
  const tmpBinBothRhs = $coerce(42, `string`);
  const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
  let template1 = $coerce(tmpBinLhs, `plustr`);
  $(template1);
} else {
  const tmpBinBothLhs$1 = `value: `;
  const tmpBinBothRhs$1 = $coerce(42, `string`);
  const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
  let template2 = $coerce(tmpBinLhs$1, `plustr`);
  $(template2);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'mode'
 - 2: 'value: 42'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
