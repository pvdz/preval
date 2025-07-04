# Preval test case

# template_with_chain_expression.md

> String fusing > Ai > Template with chain expression
>
> Test templates with chain expressions that should not be resolved statically

## Input

`````js filename=intro
const obj = { method: () => $("chained") };
const template = `result: ${obj?.method?.()}`;
const result = template + "end";
$(result);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(`chained`);
const tmpClusterSSA_tmpStringConcatL /*:string*/ = $coerce(tmpClusterSSA_tmpCalleeParam, `string`);
const tmpClusterSSA_result /*:string*/ /*truthy*/ = `result: ${tmpClusterSSA_tmpStringConcatL}end`;
$(tmpClusterSSA_result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`result: ${$(`chained`)}end`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "chained" );
const b = $coerce( a, "string" );
const c = `result: ${b}end`;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = function () {
  debugger;
  const tmpReturnArg = $(`chained`);
  return tmpReturnArg;
};
const obj = { method: tmpObjLitVal };
const tmpBinBothLhs = `result: `;
let tmpCalleeParam = undefined;
const tmpChainRootProp = obj;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.method;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, `method`);
    tmpCalleeParam = tmpChainElementCall;
  } else {
  }
} else {
}
const tmpBinBothRhs = $coerce(tmpCalleeParam, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const template = $coerce(tmpBinLhs, `plustr`);
const tmpStringConcatR = $coerce(template, `plustr`);
const result = `${tmpStringConcatR}end`;
$(result);
`````


## Todos triggered


- (todo) We should be able to resolve the $frfr call but pcode failed to complete with a Node, hasExplicitGlobal=false


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'chained'
 - 2: 'result: chainedend'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
