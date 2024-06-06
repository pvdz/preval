# Preval test case

# auto_ident_delete_computed_simple_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident delete computed simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
function f(p = (a = delete arg["y"])) {}
$(f());
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = delete arg[`y`]) : tmpParamBare;
};
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(f());
$(a, arg);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpNestedComplexRhs = delete arg.y;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const tmpNestedComplexRhs = delete arg.y;
$(undefined);
$(tmpNestedComplexRhs, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = deletea.y;
$( undefined );
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
