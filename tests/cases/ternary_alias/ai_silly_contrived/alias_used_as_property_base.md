# Preval test case

# alias_used_as_property_base.md

> Ternary alias > Ai silly contrived > Alias used as property base
>
> b is used as property base: should NOT replace

## Input

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
if (x) {} else { b = a; }
console.log(b.foo);
// Expect: No change, property base context is not safe
`````


## Settled


`````js filename=intro
$(true);
undefined.foo;
throw `[Preval]: Can not reach here`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
undefined.foo;
throw `[Preval]: Can not reach here`;
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
undefined.foo;
throw "[Preval]: Can not reach here";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
if (x) {
} else {
  b = a;
}
const tmpMCF = $console_log;
const tmpMCP = b.foo;
$dotCall(tmpMCF, console, `log`, tmpMCP);
`````


## Todos triggered


- (todo) property on nullable; unreachable or hard error?


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
