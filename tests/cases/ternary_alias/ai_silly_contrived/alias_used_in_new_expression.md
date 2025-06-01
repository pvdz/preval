# Preval test case

# alias_used_in_new_expression.md

> Ternary alias > Ai silly contrived > Alias used in new expression
>
> b is used in a new expression: should NOT replace

## Options

- globals: x

## Input

`````js filename=intro
let a = undefined;
let b = undefined;
if (x) {} else { b = a; }
$(a, b);
new b(); // <- preval can know this crashes
// Expect: No change, new expression context is not safe
`````


## Settled


`````js filename=intro
x;
$(undefined, undefined);
x;
new undefined();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x;
$(undefined, undefined);
x;
new undefined();
`````


## PST Settled
With rename=true

`````js filename=intro
x;
$( undefined, undefined );
x;
new undefined();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let b = undefined;
if (x) {
  $(a, b);
} else {
  b = a;
  $(a, a);
}
new b();
`````


## Todos triggered


None


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
