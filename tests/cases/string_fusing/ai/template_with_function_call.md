# Preval test case

# template_with_function_call.md

> String fusing > Ai > Template with function call
>
> Test templates with function calls that should not be resolved statically

## Input

`````js filename=intro
const func = () => $("func");
const template = `start${func()}end`;
const result = template + "suffix";
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`func`);
const tmpBinBothRhs /*:string*/ = $coerce(tmpCalleeParam, `string`);
const result /*:string*/ /*truthy*/ = `start${tmpBinBothRhs}endsuffix`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`start${$(`func`)}endsuffix`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "func" );
const b = $coerce( a, "string" );
const c = `start${b}endsuffix`;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const func = function () {
  debugger;
  const tmpReturnArg = $(`func`);
  return tmpReturnArg;
};
const tmpBinBothLhs = `start`;
let tmpCalleeParam = func();
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
 - 1: 'func'
 - 2: 'startfuncendsuffix'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
