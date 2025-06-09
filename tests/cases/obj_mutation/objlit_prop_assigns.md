# Preval test case

# objlit_prop_assigns.md

> Obj mutation > Objlit prop assigns
>
> Should fold up assignments to a binding known to be object literal
> This is the trivial case where the objlit is the prev statement.

## Input

`````js filename=intro
const obj = {};
obj[`7H`] = `a`;
obj[`7G`] = `b`;
obj[`7F`] = `c`;
obj[`7E`] = `d`;
obj[`7D`] = `e`;
obj[`7C`] = `f`;
$(obj);
`````


## Settled


`````js filename=intro
const obj /*:object*/ /*truthy*/ = {};
obj[`7H`] = `a`;
obj[`7G`] = `b`;
obj[`7F`] = `c`;
obj[`7E`] = `d`;
obj[`7D`] = `e`;
obj[`7C`] = `f`;
$(obj);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = {};
obj[`7H`] = `a`;
obj[`7G`] = `b`;
obj[`7F`] = `c`;
obj[`7E`] = `d`;
obj[`7D`] = `e`;
obj[`7C`] = `f`;
$(obj);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
a["7H"] = "a";
a["7G"] = "b";
a["7F"] = "c";
a["7E"] = "d";
a["7D"] = "e";
a["7C"] = "f";
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = {};
obj[`7H`] = `a`;
obj[`7G`] = `b`;
obj[`7F`] = `c`;
obj[`7E`] = `d`;
obj[`7D`] = `e`;
obj[`7C`] = `f`;
$(obj);
`````


## Todos triggered


- (todo) simple prop inlining case with computed prop


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { '7H': '"a"', '7G': '"b"', '7F': '"c"', '7E': '"d"', '7D': '"e"', '7C': '"f"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
