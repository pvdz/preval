# Preval test case

# edge_case_empty_strings.md

> String fusing > Ai > Edge case empty strings
>
> Test edge cases with empty strings and whitespace handling

## Input

`````js filename=intro
const empty = "";
const space = " ";
const result = empty + space + "test";
$(result);
`````


## Settled


`````js filename=intro
$(` test`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(` test`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( " test" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const empty = ``;
const space = ` `;
const tmpBinLhs = empty + space;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const result = `${tmpStringConcatR}test`;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ' test'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
