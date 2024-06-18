# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
function f(arg = (a = typeof x)) {}
$(f());
$(a, x);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let arg = tmpParamBare === undefined ? (a = typeof x) : tmpParamBare;
};
let x = 1;
let a = { a: 999, b: 1000 };
$(f());
$(a, x);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let arg = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpNestedComplexRhs = typeof x;
    a = tmpNestedComplexRhs;
    arg = tmpNestedComplexRhs;
    return undefined;
  } else {
    arg = tmpParamBare;
    return undefined;
  }
};
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output


`````js filename=intro
$(undefined);
$(`number`, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
$( "number", 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
