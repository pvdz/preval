# Preval test case

# template_with_call_expression.md

> String fusing > Ai > Template with call expression
>
> Test templates with call expressions that should not be resolved statically

## Input

`````js filename=intro
const func = (x) => x + "processed";
const input = $("input");
const template = `result: ${func(input)}`;
const result = template + "end";
$(result);
`````


## Settled


`````js filename=intro
const input /*:unknown*/ = $(`input`);
const tmpStringConcatR /*:string*/ = $coerce(input, `plustr`);
const result /*:string*/ /*truthy*/ = `result: ${tmpStringConcatR}processedend`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpStringConcatR = $(`input`) + ``;
$(`result: ${tmpStringConcatR}processedend`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "input" );
const b = $coerce( a, "plustr" );
const c = `result: ${b}processedend`;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const func = function ($$0) {
  let x = $$0;
  debugger;
  const tmpStringConcatR = $coerce(x, `plustr`);
  const tmpReturnArg = `${tmpStringConcatR}processed`;
  return tmpReturnArg;
};
const input = $(`input`);
const tmpBinBothLhs = `result: `;
let tmpCalleeParam = func(input);
const tmpBinBothRhs = $coerce(tmpCalleeParam, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const template = $coerce(tmpBinLhs, `plustr`);
const tmpStringConcatR$1 = $coerce(template, `plustr`);
const result = `${tmpStringConcatR$1}end`;
$(result);
`````


## Todos triggered


- (todo) support Identifier as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'input'
 - 2: 'result: inputprocessedend'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
