# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > Param default > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f(p = (a = b = $(2))) {}
$(f());
$(a, b);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = b = $(2)) : tmpParamBare;
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
    b = $(2);
    let tmpNestedComplexRhs = b;
    a = tmpNestedComplexRhs;
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
const b /*:unknown*/ = $(2);
$(undefined);
$(b, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
$( undefined );
$( a, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: undefined
 - 3: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
