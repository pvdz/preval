# Preval test case

# pure_function_inlining2.md

> Function > Pure function inlining2
>
> Testing a particular normalize infinite loop due to not eliminating idents

## Input

`````js filename=intro
const rule = function(desc) {
  const func = $;
  PURPLE;
  `purple`;
  PURPLE;
  `purple`;
  RESET;
  `reset`;
  const tmpStringConcatL = $coerce(desc, `plustr`);
  const d = `purpleRule:reset "${tmpStringConcatL}`;
  const tmpStringConcatR$3 = d;
  tmpStringConcatR$3;
  const e = `${d}"`;
  func(e);
  return undefined;
};
const PURPLE = `purple`;
const RESET = `reset`;
rule(`I want it my way`);
rule(`You have to listen to me`);
`````


## Settled


`````js filename=intro
$(`purpleRule:reset "I want it my way"`);
$(`purpleRule:reset "You have to listen to me"`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`purpleRule:reset "I want it my way"`);
$(`purpleRule:reset "You have to listen to me"`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "purpleRule:reset \"I want it my way\"" );
$( "purpleRule:reset \"You have to listen to me\"" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'purpleRule:reset "I want it my way"'
 - 2: 'purpleRule:reset "You have to listen to me"'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
