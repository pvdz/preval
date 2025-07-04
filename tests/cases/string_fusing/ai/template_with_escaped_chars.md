# Preval test case

# template_with_escaped_chars.md

> String fusing > Ai > Template with escaped chars
>
> Test templates with escaped characters that should be preserved during fusion

## Input

`````js filename=intro
const template = `hello\nworld\twith\rescape`;
const result = template + "test";
$(result);
`````


## Settled


`````js filename=intro
$(`hello
world\u0009with\u000descapetest`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`hello
world\u0009with\u000descapetest`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "hello\u000aworld\u0009with\u000descapetest" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const template = `hello\nworld\twith\rescape`;
const tmpStringConcatR = $coerce(template, `plustr`);
const result = `${tmpStringConcatR}test`;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'helloworld\twith\rescapetest'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
