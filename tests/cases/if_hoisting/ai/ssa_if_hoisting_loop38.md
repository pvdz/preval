# Preval test case

# ssa_if_hoisting_loop38.md

> If hoisting > Ai > Ssa if hoisting loop38
>
> Test if_hoisting and SSA infinite loop: identical vars used in template literals

## Input

`````js filename=intro
const template = $("template");
if (template) {
  let var1 = "world";
  $(var1);
  let str1 = `Hello ${var1}`;
  $(str1);
} else {
  let var2 = "world";
  $(var2);
  let str2 = `Hello ${var2}`;
  $(str2);
}
`````


## Settled


`````js filename=intro
$(`template`);
$(`world`);
$(`Hello world`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`template`);
$(`world`);
$(`Hello world`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "template" );
$( "world" );
$( "Hello world" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const template = $(`template`);
if (template) {
  let var1 = `world`;
  $(var1);
  const tmpBinBothLhs = `Hello `;
  const tmpBinBothRhs = $coerce(var1, `string`);
  const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
  let str1 = $coerce(tmpBinLhs, `plustr`);
  $(str1);
} else {
  let var2 = `world`;
  $(var2);
  const tmpBinBothLhs$1 = `Hello `;
  const tmpBinBothRhs$1 = $coerce(var2, `string`);
  const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
  let str2 = $coerce(tmpBinLhs$1, `plustr`);
  $(str2);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'template'
 - 2: 'world'
 - 3: 'Hello world'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
