# Preval test case

# alias_used_as_function_call.md

> Ternary alias > Ai silly contrived > Alias used as function call
>
> b is used as a function call: should NOT replace

## Input

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
if (x) {} else { b = a; }
b();
// Expect: No change, function call context is not safe
`````


## Settled


`````js filename=intro
$(true);
throw `[Preval] Attempting to call a value that cannot be called: \`undefined();\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
throw `[Preval] Attempting to call a value that cannot be called: \`undefined();\``;
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
throw "[Preval] Attempting to call a value that cannot be called: `undefined();`";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
if (x) {
  b();
} else {
  b = a;
  a();
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
