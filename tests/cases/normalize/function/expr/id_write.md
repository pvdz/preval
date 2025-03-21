# Preval test case

# id_write.md

> Normalize > Function > Expr > Id write
>
> Function recursion by referencing a function expr id

For this reason we must create a constant outside of the function and a local alias as let. The local alias should be eliminated if it has no writes.

## Input

`````js filename=intro
const f = function funcexprname() {
  funcexprname = 20; // This throws in strict mode because `funcexprname` is a constant.
  return funcexprname;
};
const x = f();
$(x, typeof f);
`````


## Settled


`````js filename=intro
throw `Preval: Cannot write to const binding \`funcexprname\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `Preval: Cannot write to const binding \`funcexprname\``;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "Preval: Cannot write to const binding `funcexprname`";
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ Assignment to constant variable. ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
