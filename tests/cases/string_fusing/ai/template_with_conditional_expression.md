# Preval test case

# template_with_conditional_expression.md

> String fusing > Ai > Template with conditional expression
>
> Test templates with conditional expressions that should not be resolved statically

## Input

`````js filename=intro
const condition = $("true");
const template = `start${condition ? "yes" : "no"}end`;
const result = template + "suffix";
$(result);
`````


## Settled


`````js filename=intro
const condition /*:unknown*/ = $(`true`);
if (condition) {
  $(`startyesendsuffix`);
} else {
  $(`startnoendsuffix`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`true`)) {
  $(`startyesendsuffix`);
} else {
  $(`startnoendsuffix`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "true" );
if (a) {
  $( "startyesendsuffix" );
}
else {
  $( "startnoendsuffix" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const condition = $(`true`);
const tmpBinBothLhs = `start`;
let tmpCalleeParam = undefined;
if (condition) {
  tmpCalleeParam = `yes`;
} else {
  tmpCalleeParam = `no`;
}
const tmpBinBothRhs = $coerce(tmpCalleeParam, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const template = `${tmpStringConcatR}end`;
const tmpStringConcatR$1 = $coerce(template, `plustr`);
const result = `${tmpStringConcatR$1}suffix`;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'true'
 - 2: 'startyesendsuffix'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
