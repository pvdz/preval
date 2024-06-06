# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Assignments > Param default > Auto ident s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
function f(p = (a = ($(1), $(2), x))) {}
$(f());
$(a, x);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = ($(1), $(2), x)) : tmpParamBare;
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
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    $(1);
    $(2);
    const tmpNestedComplexRhs = x;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
    return undefined;
  } else {
    p = tmpParamBare;
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
$(1);
$(2);
$(undefined);
$(1, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( undefined );
$( 1, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: undefined
 - 4: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
