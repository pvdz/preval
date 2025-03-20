# Preval test case

# id_write2.md

> Normalize > Function > Expr > Id write2
>
> Function recursion by referencing a function expr id

## Input

`````js filename=intro
const r = function () {
  debugger;
  r = 20;
  return r;
};
const f = r;
const x = f();
const tmpCallCallee = $;
const tmpCalleeParam = x;
const tmpCalleeParam$1 = typeof f;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````


## Settled


`````js filename=intro
throw `Preval: Cannot write to const binding \`r\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `Preval: Cannot write to const binding \`r\``;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "Preval: Cannot write to const binding `r`";
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ Assignment to constant variable. ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
