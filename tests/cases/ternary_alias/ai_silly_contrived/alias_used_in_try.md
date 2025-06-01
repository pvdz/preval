# Preval test case

# alias_used_in_try.md

> Ternary alias > Ai silly contrived > Alias used in try
>
> b is used in try/catch: should NOT replace

## Input

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
if (x) {} else { b = a; }
try { $(b); } catch (e) {}
// Expect: No change, try/catch context is not safe
`````


## Settled


`````js filename=intro
$(true);
try {
  $(undefined);
} catch (e) {}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
try {
  $(undefined);
} catch (e) {}
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
try {
  $( undefined );
}
catch (a) {

}
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
try {
  $(b);
} catch (e) {}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
