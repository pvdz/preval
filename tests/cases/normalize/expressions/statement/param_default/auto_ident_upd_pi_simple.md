# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Statement > Param default > Auto ident upd pi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f(p = ++b) {}
$(f());
$(a, b);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? ++b : tmpParamBare;
};
let b = 1;
let a = { a: 999, b: 1000 };
$(f());
$(a, b);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpNestedCompoundLhs = b;
    const tmpNestedComplexRhs = tmpNestedCompoundLhs + 1;
    b = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
$(undefined);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 2);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
const a = {
  a: 999,
  b: 1000,
};
$( a, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
