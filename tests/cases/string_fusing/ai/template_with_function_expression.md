# Preval test case

# template_with_function_expression.md

> String fusing > Ai > Template with function expression
>
> Test templates with function expressions that should not be resolved statically

## Input

`````js filename=intro
const func = function() { return $("function"); };
const template = `func: ${func()}`;
const result = template + "end";
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`function`);
const tmpBinBothRhs /*:string*/ = $coerce(tmpCalleeParam, `string`);
const result /*:string*/ /*truthy*/ = `func: ${tmpBinBothRhs}end`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`func: ${$(`function`)}end`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "function" );
const b = $coerce( a, "string" );
const c = `func: ${b}end`;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const func = function () {
  debugger;
  const tmpReturnArg = $(`function`);
  return tmpReturnArg;
};
const tmpBinBothLhs = `func: `;
let tmpCalleeParam = func();
const tmpBinBothRhs = $coerce(tmpCalleeParam, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const template = $coerce(tmpBinLhs, `plustr`);
const tmpStringConcatR = $coerce(template, `plustr`);
const result = `${tmpStringConcatR}end`;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'function'
 - 2: 'func: functionend'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
