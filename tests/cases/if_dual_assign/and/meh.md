# Preval test case

# meh.md

> If dual assign > And > Meh
>
> imafool

#TODO

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

## Pre Normal


`````js filename=intro
const getFuncIdentGeneratorState = function ($$0, $$1, $$2) {
  let isRealFuncExpr$3 = $$0;
  let enclosingScopeFlags = $$1;
  let $tp_star_type$3 = $$2;
  debugger;
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

## Normalized


`````js filename=intro
const getFuncIdentGeneratorState = function ($$0, $$1, $$2) {
  let isRealFuncExpr$3 = $$0;
  let enclosingScopeFlags = $$1;
  let $tp_star_type$3 = $$2;
  debugger;
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

## Output


`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
