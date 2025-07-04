# Preval test case

# template_with_optional_chaining.md

> String fusing > Ai > Template with optional chaining
>
> Test templates with optional chaining that should not be resolved statically

## Input

`````js filename=intro
const obj = { nested: { value: $("optional") } };
const template = `value: ${obj?.nested?.value}`;
const result = template + "end";
$(result);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:unknown*/ = $(`optional`);
const tmpClusterSSA_tmpStringConcatL /*:string*/ = $coerce(tmpObjLitVal$1, `string`);
const tmpClusterSSA_result /*:string*/ /*truthy*/ = `value: ${tmpClusterSSA_tmpStringConcatL}end`;
$(tmpClusterSSA_result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`value: ${$(`optional`)}end`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "optional" );
const b = $coerce( a, "string" );
const c = `value: ${b}end`;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal$1 = $(`optional`);
const tmpObjLitVal = { value: tmpObjLitVal$1 };
const obj = { nested: tmpObjLitVal };
const tmpBinBothLhs = `value: `;
let tmpCalleeParam = undefined;
const tmpChainRootProp = obj;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.nested;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainElementObject.value;
    tmpCalleeParam = tmpChainElementObject$1;
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
 - 1: 'optional'
 - 2: 'value: optionalend'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
