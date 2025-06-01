# Preval test case

# alias_used_in_template_literal.md

> Ternary alias > Ai silly contrived > Alias used in template literal
>
> b is used in a template literal: should NOT replace

## Input

`````js filename=intro
let x = true;
let a = undefined;
let b = undefined;
if (x) {} else { b = a; }
let str = `Value: ${b}`;
$(a, b, str);
// Expect: No change, template literal context is not safe
`````


## Settled


`````js filename=intro
$(undefined, undefined, `Value: undefined`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined, undefined, `Value: undefined`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined, undefined, "Value: undefined" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = true;
let a = undefined;
let b = undefined;
if (x) {
} else {
  b = a;
}
const tmpBinBothLhs = `Value: `;
const tmpBinBothRhs = $coerce(b, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let str = $coerce(tmpBinLhs, `plustr`);
$(a, b, str);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined, undefined, 'Value: undefined'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
