# Preval test case

# meh.md

> If dual assign > And > Meh
>
> imafool

## Input

`````js filename=intro
const getFuncIdentGeneratorState = function (isRealFuncExpr$3, enclosingScopeFlags, $tp_star_type$3) {
  const tmpBinLhs$621 = enclosingScopeFlags & 8192;
  if (tmpBinLhs$621) {
    return 128;
  } else {
    const tmpIfTest$2143 = isRealFuncExpr$3 === true;
    if (tmpIfTest$2143) {
      const tmpIfTest$2145 = $tp_star_type$3 === 82010;
      if (tmpIfTest$2145) {
        return 128;
      } else {
        return 0;
      }
    } else {
      const tmpBinLhs$623 = enclosingScopeFlags & 128;
      return tmpBinLhs$623;
    }
  }
};
getFuncIdentGeneratorState();
getFuncIdentGeneratorState();
getFuncIdentGeneratorState();
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
