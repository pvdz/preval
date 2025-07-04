# Preval test case

# template_with_logical_assignment.md

> String fusing > Ai > Template with logical assignment
>
> Test templates with logical assignment that should not be resolved statically

## Input

`````js filename=intro
let value = null;
const template = `result: ${value ||= $("assigned")}`;
const result = template + "end";
$(result);
`````


## Settled


`````js filename=intro
const tmpNestedComplexRhs /*:unknown*/ = $(`assigned`);
const tmpClusterSSA_tmpBinBothRhs /*:string*/ = $coerce(tmpNestedComplexRhs, `string`);
const result /*:string*/ /*truthy*/ = `result: ${tmpClusterSSA_tmpBinBothRhs}end`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`result: ${$(`assigned`)}end`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "assigned" );
const b = $coerce( a, "string" );
const c = `result: ${b}end`;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let value = null;
const tmpBinBothLhs = `result: `;
let tmpCalleeParam = value;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  const tmpNestedComplexRhs = $(`assigned`);
  value = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
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


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'assigned'
 - 2: 'result: assignedend'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
