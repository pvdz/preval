# Preval test case

# ai_template_literal_opaque_expr.md

> Ai > Ai2 > Ai template literal opaque expr
>
> Test: Template literal with an opaque expression.

## Input

`````js filename=intro
// Expected: `Hello ${$('name')}!`; (or equivalent normalized form)
let userName = $('user_name_source');
let greeting = `Hello ${userName}!`;
$('result', greeting);
`````


## Settled


`````js filename=intro
const userName /*:unknown*/ = $(`user_name_source`);
const tmpBinBothRhs /*:string*/ = $coerce(userName, `string`);
const greeting /*:string*/ = `Hello ${tmpBinBothRhs}!`;
$(`result`, greeting);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`result`, `Hello ${$(`user_name_source`)}!`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "user_name_source" );
const b = $coerce( a, "string" );
const c = `Hello ${b}!`;
$( "result", c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let userName = $(`user_name_source`);
const tmpBinBothLhs = `Hello `;
const tmpBinBothRhs = $coerce(userName, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
let greeting = `${tmpStringConcatR}!`;
$(`result`, greeting);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'user_name_source'
 - 2: 'result', 'Hello user_name_source!'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
