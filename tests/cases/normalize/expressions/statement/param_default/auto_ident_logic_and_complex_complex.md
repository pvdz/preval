# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Param default > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = $($(1)) && $($(2))) {}
$(f());
$(a);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? $($(1)) && $($(2)) : tmpParamBare;
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    p = tmpCallCallee(tmpCalleeParam);
    if (p) {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(2);
      p = tmpCallCallee$1(tmpCalleeParam$1);
      return undefined;
    } else {
      return undefined;
    }
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$3(tmpCalleeParam$3);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
const tmpClusterSSA_p = $(tmpCalleeParam);
if (tmpClusterSSA_p) {
  const tmpCalleeParam$1 = $(2);
  $(tmpCalleeParam$1);
} else {
}
$(undefined);
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 2 );
  $( c );
}
$( undefined );
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: undefined
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
